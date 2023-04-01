const postService = require('../services/post.service');
const ApiError = require('../api-error');

class PostController {
    async createPost(req, res, next) {
        try {
            const document = await postService.create(req, res,next);
        } catch (err) {
            console.log(err);
            return next(
                new ApiError(500, err)
            );
        }
    }

    async getAllPost(req, res, next) {
        try {
            const posts = await postService.getAll(req, res, next);
        } catch (err) {
            console.log(err);
            return next(
                new ApiError(500, 'Có lỗi khi lấy post')
            )
        };
    }

    async getPostById(req, res, next) {
        try {
            const detailPost = await postService.getById(req, res, next);
        } catch (err) {
            console.log(err);
            return next(
                new ApiError(500, err)
            );
        }
    }

    async removePostById(req, res, next) {
        try {
            const response = await postService.deleteById(req, res, next);
        } catch (err) {
            console.log(err);
            return next(
                new ApiError(500, err)
            );
        }
    }

    async userSavedPost(req, res, next) {
        try {
            const saved = await postService.savedPost(req, res, next);
        } catch (err) {
            console.log(err);
        }
    }

    async userRemoveSavedPost(req, res, next) {
        try {
            const saved = await postService.removeSavedPost(req, res, next);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new PostController;