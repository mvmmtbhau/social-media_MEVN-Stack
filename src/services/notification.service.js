import instance from './api.service';

class NotificationService {
    constructor() {
        this.api = instance;
    }

    async getNotificationsByUserId(userId) {
        return (await this.api.get(`/notification/get/${userId}`))
    }
}

export default new NotificationService();