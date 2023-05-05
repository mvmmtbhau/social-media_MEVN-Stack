const express = require('express');
const router = express.Router();

const conversationController = require('../controllers/conversation.controller');
const { isAuthentication } = require('../middlewares/auth.middleware');

router.post('/create', [isAuthentication], conversationController.createConversation);

router.get('/:conversationId', [isAuthentication], conversationController.getConversationById);
router.get('/all/:userId', [isAuthentication], conversationController.getConversationsByUserId);

module.exports = router;