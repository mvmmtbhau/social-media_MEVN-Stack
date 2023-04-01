const messageService = require('../services/message.service');
const ApiError = require('../api-error');

class MessageController {
    async sendMessage(req, res, next) {
        try {
            const message = await messageService.send(req, res, next);
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new MessageController;