const commentService = require('../services/comment.service');
const ApiError = require('../api-error');

class CommentController {
    async createComment(req, res, next) {
        try {
            return await commentService.createComment(req, res);
        } catch (err) {
            console.log(err);
            return next(
                new ApiError(500, err)
            );
        }
    }

    async getCommentsByPostId(req, res, next) {
        try {
            return await commentService.getCommentsByPostId(req, res);
        } catch (err) {
            console.log(err);
            return next(
                new ApiError(500, err)
            );
        }
    }

    async deleteComment(req, res, next) {
        try {
            const response = await commentService.deleteById(req, res, next);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}

module.exports = new CommentController;