const express = require('express');
const router = express.Router();

const conversationController = require('../controllers/conversation.controller');
const { isAuthentication } = require('../middlewares/auth.middleware');

router.post('/create', conversationController.createConversation);


router.get('/:conversationId', conversationController.getConversationById);
router.get('/all/:userId', conversationController.getConversationsByUserId);

module.exports = router;