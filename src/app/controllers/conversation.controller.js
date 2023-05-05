const conversationService = require('../services/conversation.service');
const messageService = require('../services/message.service');

class ConversationController {
    async createConversation(req, res, next) {
        try {
            const sender = req.body.sender;
            const receiver = req.body.receiver;

            const isExisted = await conversationService.findOne({
                $or: [
                    {
                        userOne: sender,
                        userTwo: receiver
                    },
                    {
                        userOne: receiver,
                        userTwo: sender,
                    },
                ]
            });

            if(isExisted) return res.status(200).json(isExisted);

            if(!isExisted && !req.body.message) return res.status(202).json({});

            const newChatbox = await conversationService.create(sender, receiver);

            const data = {
                message: req.body.message,
                conversationId: newChatbox._id,
                sender: sender,
            }
            
            const newMessage = await messageService.create(data);

            if(newChatbox && newMessage) return res.status(201).json(newChatbox);
        } catch (err) {
            console.log(err);
        }
    }

    async getConversationsByUserId(req, res, next) {
        try {
            const conversations = await conversationService.getByUserId(req, res, next);
        } catch (err) {
            console.log(err);
        }
    }

    async getConversationById(req, res, next) {
        try {
            const conversation = await conversationService.getById(req, res, next);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new ConversationController;