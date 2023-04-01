import instance from './api.service';

class LikeCommentService {
    constructor() {
        this.api = instance;
    }

    async likeComment(data) {
        return (await this.api.post('/likeComment/like',data));
    }

    async unlikeComment(commentId, userId) {
        return (await this.api.delete(`/likeComment/unlike/${commentId}&${userId}`));
    }

    async getLikesByCommentId(commentId) {
        return (await this.api.get(`/like/all/${commentId}`));
    }
}

export default new LikeCommentService();