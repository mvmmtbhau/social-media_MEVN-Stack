const { Conversation } = require('../models/');
const mongoose = require('mongoose');

class ConversationService {
    async create(sender, receiver) {
        const conversation = new Conversation({
            userOne: sender,
            userTwo: receiver
        });

        return conversation.save();
    }

    async findOne(filter) {
        return await Conversation
        .findOne(filter)
        .populate('userOne', '-userName -password').populate('userTwo', '-userName -password').populate('hasMessages');
    }

    async getByUserId(req, res, next) {
        try {
            const conversations = await Conversation.find({
                $or: [
                    { userOne: req.params.userId },
                    { userTwo: req.params.userId },
                ]
            }).populate('userOne', '-userName -password').populate('userTwo', '-userName -password').populate('hasMessages').sort({updatedAt: 'desc'});

            return res.status(200).send(conversations);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    async getById(req, res, next) {
        try {
            const conversation = await Conversation.findById(
                req.params.conversationId
            ).populate('userOne', '-userName -password').populate('userTwo', '-userName -password').populate('hasMessages');
            return res.status(200).send(conversation);
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

module.exports = new ConversationService;