import instance from './api.service';

class AuthService {
    constructor() {
        this.api = instance;
    }

    async register(data) {
        return (await this.api.post('/auth/register', data));   
    }

    async login(data){
        return (await this.api.post('/auth/login', data));
    }

    async getUserById(userId) {
        return (await this.api.get(`/auth/profile/${userId}`));  
    }

    async getUsers(userId, limit) {
        return (await this.api.get(`/auth/${userId}?limit=${limit}`));
    }

    async updateAccount(data){
        return (await this.api(
            {
                method: 'POST',
                url: `/auth/update/${data.userId}`,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: data
            }
        ));
    }

    async changePassword(data) {
        return (await this.api.post('/auth/change/password', data));
    }

    async changePrivateState(userId) {
        return (await this.api.post(`/auth/change/privateState/${userId}`, ));
    }
}

export default new AuthService();