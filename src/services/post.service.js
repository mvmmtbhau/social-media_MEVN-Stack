import instance from './api.service';

class PostService {
    constructor() {
        this.api = instance;
    }

    async getAll(userId) {
        return (await this.api.get(`/posts/${userId}`));
    }

    async getPostById(postId) {
        return (await this.api.get(`/posts/detail/${postId}`));
    }

    async createPost(data) {
        return (await this.api(
            {
                method: 'POST',
                url: "/posts",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: data
            }
        ));
    }

    async deletePost(postId) {
        return (await this.api.delete(`/posts/${postId}`));
    }

    async savedPost(data) {
        return (await this.api.post('/posts/savedPost', data));
    }

    async removeSavedPost(data) {
        return (await this.api.post('/posts/removeSavedPost', data));
    }
}

export default new PostService();