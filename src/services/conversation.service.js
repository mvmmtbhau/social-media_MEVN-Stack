import instance from './api.service';

class ConversationService {
    constructor() {
        this.api = instance;
    }

    async create(data) {
        return (await this.api.post('/conversation/create',data));
    }

    async getConversationsByUserId(userId) {
        return (await this.api.get(`/conversation/all/${userId}`));
    }

    async getConversationById(conversationId) {
        return (await this.api.get(`/conversation/${conversationId}`));
    }
}

export default new ConversationService();