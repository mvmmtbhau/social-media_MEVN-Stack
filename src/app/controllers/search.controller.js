const searchService = require('../services/search.service');
const ApiError = require('../api-error');

class SearchController {
    async saveNewSearch(req, res, next) {
        try {
            const search = await searchService.save(req, res, next);
        } catch (err) {
            console.log(err);
        }
    }

    async getHistoryByUserId(req, res, next) {
        try {
            const search = await searchService.getByUserId(req, res, next);
        } catch (err) {
            console.log(err);
        }
    }

    async searching(req,res,next) {
        try {
            const result = await searchService.search(req, res, next);
        } catch (err) {
            console.log(err);
        }
    }

    async updateSearchWithRemove(req, res, next) {
        try {
            const result = await searchService.updateWithRemove(req, res, next);
        } catch (err) {
            console.log(err);
        }
    }

    async updateSearchWithRemoveAll(req, res, next) {
        try {
            const result = await searchService.updateWithRemoveAll(req, res, next);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new SearchController;