const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message.controller');
const { isAuthentication } = require('../middlewares/auth.middleware');

router.post('/send', messageController.sendMessage);

module.exports = router;