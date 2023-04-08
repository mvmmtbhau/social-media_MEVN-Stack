const followService = require('../services/follow.service');
const ApiError = require('../api-error');

class FollowController {
    async createFollow(req, res, next) {
        try {
            const follow = await followService.create(req, res, next);
        } catch (err) {
            console.log(err);
            return next(
                new ApiError(500, err)
            )
        }
    }

    async deleteFollow(req, res, next) {
        try {
            const follow = await followService.delete(req, res, next);
        } catch (err) {
            console.log(err);
            return next(
                new ApiError(500, err)
            )
        }
    }   
    
    async updateStateFollow(req, res,next) {
        const response = await followService.update(req, res, next);
    }
}

module.exports = new FollowController;