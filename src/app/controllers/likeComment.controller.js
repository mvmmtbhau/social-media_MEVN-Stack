const likeCommentService = require('../services/likeComment.service');
const ApiError = require('../api-error');

class LikeCommentController {
    async likeComment(req, res, next) {
        try {
            const likeComment = await likeCommentService.likeComment(req, res, next);
        } catch (err) {
            console.log(err);
            return next(
                new ApiError(500, err)
            )
        }
    }

    async unlikeComment(req, res, next) {
        try {
            const unlikeComment = await likeCommentService.deleteLikeComment(req, res, next);
        } catch (err) {
            console.log(err);
            return next(
                new ApiError(500, err)
            )   
        }
    }

    async getLikesByCommentId(req, res, next) {
        try {
            const likes = await likeCommentService.getByCommentId(req, res, next);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new LikeCommentController;