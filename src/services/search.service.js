import instance from './api.service';

class SearchService {
    constructor() {
        this.api = instance;
    }

    async searching(searchKey, userId) {
        return (await this.api.get(`/search/searching/${userId}&${searchKey}`));
    }

    async saveNewSearch(data) {
        return (await this.api.post(`/search/save`,data));
    }

    async getByUserId(userId) {
        return (await this.api.get(`/search/get/${userId}`));
    }

    async removeHistory(data) {
        return (await this.api.post(`/search/remove`,data));
    }

    async removeAll(data) {
        return (await this.api.post(`/search/removeAll`,data));
    }
}

export default new SearchService();