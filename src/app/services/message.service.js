const { Conversation, Message } = require('../models/');
const mongoose = require('mongoose');

class MessageService {
    async send(req, res, next) {
        const message = new Message({
            message: req.body.message,
            belongConversation: req.body.conversationId,
            sender: req.body.sender
        });

        try {
            const newMessage = await message.save();
            if(newMessage) {
                const updateConversation = await Conversation.findByIdAndUpdate(
                    message.belongConversation,
                    {
                        $push: {
                            hasMessages: newMessage._id,
                        }
                    },
                    { new: true, useFindAndModify: false },
                );
            }
            return res.status(201).send(newMessage);
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

module.exports = new MessageService;