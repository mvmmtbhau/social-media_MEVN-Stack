import instance from './api.service';

class FollowService {
    constructor() {
        this.api = instance;
    }

    async following(data) {
        return (await this.api.post('/follow',data));
    }

    async unFollow(userFollowed, userFollowing) {
        return (await this.api.delete(`/follow/unfollow/${userFollowed}&${userFollowing}`));
    }
}

export default new FollowService();