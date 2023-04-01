import instance from './api.service';

class CommentService {
    constructor() {
        this.api = instance;
    }

    async createComment(data) {
        return (await this.api.post('/comments',data));
    }

    async getCommentsByPostId(postId) {
        return (await this.api.get(`/comments/${postId}`));
    }
}

export default new CommentService();