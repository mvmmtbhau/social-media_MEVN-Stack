const conversationService = require('../services/conversation.service');
const ApiError = require('../api-error');

class ConversationController {
    async createConversation(req, res, next) {
        try {
            const newConversation = await conversationService.create(req, res, next);
        } catch (err) {
            console.log(err);
        }
    }

    async getConversationsByUserId(req, res, next) {
        try {
            const conversations = await conversationService.getByUserId(req, res, next);
        } catch (err) {
            console.log(err); 
        } 
    }

    async getConversationById(req, res, next) {
        try {
            const conversation = await conversationService.getById(req, res, next);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new ConversationController;