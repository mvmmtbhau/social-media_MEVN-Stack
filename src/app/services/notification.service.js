const { Notification } = require('../models/');
const mongoose = require('mongoose');

class MessageService {
    async getByUserId(req, res, next) {
        try {
            console.log(req.params);
            const notis = await Notification.find({
                toUser: req.params.userId,
            }).populate('fromUser', '-userName -password');
            if(notis) {
                return res.status(200).send(notis);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    }
}

module.exports = new MessageService;