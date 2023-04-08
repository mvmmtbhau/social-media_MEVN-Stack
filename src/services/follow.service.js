import instance from './api.service';

class FollowService {
    constructor() {
        this.api = instance;
    }

    async following(data) {
        return (await this.api.post('/follow',data));
    }

    async unFollow(fromUser, followUser) {
        return (await this.api.delete(`/follow/unfollow/${fromUser}&${followUser}`));
    }

    async updateState(followId) {
        return (await this.api.patch(`/follow/update/${followId}`));
    }
}

export default new FollowService();