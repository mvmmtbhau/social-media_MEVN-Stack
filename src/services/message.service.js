import instance from './api.service';

class MessageService {
    constructor() {
        this.api = instance;
    }

    async sendMessage(data) {
        return (await this.api.post('/message/send',data));
    }
}

export default new MessageService();