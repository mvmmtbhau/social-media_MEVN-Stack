const { Conversation } = require('../models/');
const mongoose = require('mongoose');

class ConversationService {
    async create(req, res, next) {
        const { receiver, sender } = req.body;
        try {
            const isExist = await Conversation.findOne({
                $or: [
                    {
                        userOne: sender,
                        userTwo: receiver
                    },
                    {
                        userOne: receiver,
                        userTwo: sender
                    }
                ]
            });

            if (isExist) return res.status(202).send(isExist);

            const conversation = new Conversation({
                userOne: sender,
                userTwo: receiver
            });

            const result = conversation.save();
            return res.status(201).send(result);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    async getByUserId(req, res, next) {
        try {
            const conversations = await Conversation.find({
                $or: [
                    { userOne: req.params.userId },
                    { userTwo: req.params.userId },
                ]
            }).populate('userOne', '-userName -password').populate('userTwo', '-userName -password');

            return res.status(200).send(conversations);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    async getById(req, res, next) {
        console.log(req.params);
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