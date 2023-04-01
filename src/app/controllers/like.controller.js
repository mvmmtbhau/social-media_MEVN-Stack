const likeService = require('../services/like.service');
const ApiError = require('../api-error');

class LikeController {
    async likePost(req, res, next) {
        try {
            const likePost = await likeService.likePost(req, res, next);

        } catch (err) {
            console.log(err);
            return next(
                new ApiError(500, err)
            )
        }
    }

    async unlikePost(req, res, next) {
        try {
            const unLike = await likeService.deleteLikePost(req, res, next);
        } catch (err) {
            console.log(err);
            return next(
                new ApiError(500, err)
            )   
        }
    }

    async getLikesByPostId(req, res, next) {
        try {
            const likes = await likeService.getByPostId(req, res, next);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new LikeController;