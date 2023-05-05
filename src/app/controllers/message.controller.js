const messageService = require('../services/message.service');
const ApiError = require('../api-error');

class MessageController {
    async sendMessage(req, res, next) {
        try {
            const data = {
                message: req.body.message,
                conversationId: req.body.conversationId,
                sender: req.body.sender
            }

            const newMessage = await messageService.create(data);
            return res.status(201).json(newMessage);
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new MessageController;