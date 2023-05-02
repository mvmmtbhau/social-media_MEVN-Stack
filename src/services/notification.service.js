import instance from './api.service';

class NotificationService {
    constructor() {
        this.api = instance;
    }

    async getByUserId(userId) {
        return (await this.api.get(`/notification/${userId}`))
    }
    
    async update(userId) {
        return (await this.api.post(`/notification/update/${userId}`))
    }
}

export default new NotificationService();