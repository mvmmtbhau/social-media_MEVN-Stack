import instance from './api.service';

class ReportService {
    constructor() {
        this.api = instance;
    }

    async addNew(data) {
        return (await this.api.post(`/report/add/`, data));
    }

    async getReportPosts() {
        return (await this.api.get('/report/posts'));
    }

    async update(data) {
        return (await this.api.post('/report/update', data));
    }

    async getReportComments(page, per_page, sortBy) {
        return (await this.api.get(`/report/comments?page=${page}&per_page=${per_page}&sort_by=${sortBy}`));
    }

    // async update(optionId, data) {
    //     return (await this.api.patch(`/option_report/update/${optionId}`, data));
    // }

    // async delete(optionId) {
    //     return (await this.api.delete(`/option_report/delete/${optionId}`));
    // }

    // async getOptions() {
    //     return (await this.api.get('/option_report/all'));
    // }
}

export default new ReportService();