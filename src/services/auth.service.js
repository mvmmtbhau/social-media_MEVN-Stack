import instance from './api.service';

class AuthService {
    constructor() {
        this.api = instance;
    }

    async getUserById(userId) {
        return (await this.api.get(`/auth/profile/${userId}`));  
    }

    async register(data) {
        return (await this.api.post('/auth/register', data));   
    }

    async login(data){
        return (await this.api.post('/auth/login', data));
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
}

export default new AuthService();