const notificationService = require('../services/notification.service');
const ApiError = require('../api-error');

class NotificationController {
    async getNotisByUserId(req, res, next) {
        return await notificationService.getByUserId(req, res, next);
    }
}

module.exports = new NotificationController;