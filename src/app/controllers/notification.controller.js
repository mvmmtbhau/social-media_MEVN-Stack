const notificationService = require('../services/notification.service');

class NotificationController {
    async getNotisByUserId(req, res, next) {
       return await notificationService.getByUserId(req, res, next);
    }

    async updateNotis(req, res, next) {
        return await notificationService.update(req, res, next);
    }
}

module.exports = new NotificationController;