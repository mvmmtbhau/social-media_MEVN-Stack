import instance from './api.service';

class SearchService {
    constructor() {
        this.api = instance;
    }

    async addNew(data) {
        return (await this.api.post(`/option_report/add/`, data));
    }

    async getAll(page, per_page, sortBy, searchText) {
        return (await this.api.get(`/option_report?page=${page}&per_page=${per_page}&sort_by=${sortBy}&search_text=${searchText}`));
    }

    async update(optionId, data) {
        return (await this.api.patch(`/option_report/update/${optionId}`, data));
    }

    async delete(optionId) {
        return (await this.api.delete(`/option_report/delete/${optionId}`));
    }
}

export default new SearchService();