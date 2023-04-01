import instance from './api.service';

class LikeService {
    constructor() {
        this.api = instance;
    }

    async likePost(data) {
        return (await this.api.post('/like/post',data));
    }

    async unLikePost(postId, userId) {
        return (await this.api.delete(`/like/post/unlike/${postId}&${userId}`));
    }

    async getLikesByPostId(postId) {
        return (await this.api.get(`/like/all/${postId}`));
    }
}

export default new LikeService();