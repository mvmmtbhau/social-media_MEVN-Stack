const express = require('express');
const router = express.Router();

const notificationController = require('../controllers/notification.controller');

router.post('/update/:userId', notificationController.updateNotis);

router.get('/:userId', notificationController.getNotisByUserId);

module.exports = router;