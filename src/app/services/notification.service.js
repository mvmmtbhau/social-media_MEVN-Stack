const { Notification } = require('../models/');
const mongoose = require('mongoose');

class MessageService {
    async getByUserId(req, res, next) {
        try {
            const notis = await Notification.find({
                toUser: req.params.userId
            }).populate('fromUser', '-userName -password');

            return res.status(200).json(notis);
        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    }

    async update(req, res, next) {
        try {
            const updateNotis = await Notification.updateMany(
                {
                    toUser: req.params.userId
                },
                {
                    read: true,
                }
            )

            if(updateNotis) return res.status(200).json(updateNotis);
        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    }
}

module.exports = new MessageService;