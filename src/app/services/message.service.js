const { Conversation, Message } = require('../models/');
const mongoose = require('mongoose');

class MessageService {
    async create(data) {
        try {
        const message = new Message({
            message: data.message,
            belongConversation: data.conversationId,
            sender: data.sender
        });

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
            return newMessage;
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

module.exports = new MessageService;