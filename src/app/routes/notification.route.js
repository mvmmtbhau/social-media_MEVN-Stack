const express = require('express');
const router = express.Router();

const notificationController = require('../controllers/notification.controller');
const { isAuthentication } = require('../middlewares/auth.middleware');

router.post('/update/:userId', [isAuthentication], notificationController.updateNotis);

router.get('/:userId', [isAuthentication], notificationController.getNotisByUserId);

module.exports = router;