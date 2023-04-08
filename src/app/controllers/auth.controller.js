const authService = require('../services/auth.service');
const ApiError = require('../api-error');

class AuthController {
    async getAll(req, res, next) {
        let documents = []
        try {
            documents = await authService.getAllUser({})
        } catch (err) {
            console.log(err);
            return next(
                new ApiError(500, err)
            )
        };
        return res.send(documents);
    }

    async getUserById(req, res, next){
        try {
            const user = await authService.getUserById(req, res, next);
        } catch (err) {
            return next(
                new ApiError(500, err)
            )
        }
    }

    async updateAccount(req, res, next){
        try {
            const user = await authService.update(req, res, next);
        } catch (err) {
            return next(
                new ApiError(500, err)
            )
        }
    }

    async changePassword(req, res, next) {
        const response = await authService.changePassword(req, res, next);
    }

    async changePrivateState(req, res, next) {
        const response = await authService.changePrivateState(req, res, next);
    }

    async login(req, res, next) {
        try {
            return await authService.login(req, res, next);
        } catch (err) {
            console.log(err);
            return next(new ApiError(500,err));
        }
    }

    async signUp(req, res, next) {
        try {
            const signUp = await authService.register(req, res,next);
        } catch (err) {
            console.log(err);
            return next(new ApiError(500, err));
        }
    }
}

module.exports = new AuthController;