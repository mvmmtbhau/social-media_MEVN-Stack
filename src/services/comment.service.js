import instance from './api.service';

class CommentService {
    constructor() {
        this.api = instance;
    }

    async createComment(data) {
        return (await this.api.post('/comments',data));
    }

    async getCommentsByPostId(postId, userId) {
        return (await this.api.get(`/comments/${postId}&${userId}`));
    }

    async deleteComment(commentId) {
        return (await this.api.delete(`/comments/delete/${commentId}`));
    }
}

export default new CommentService();