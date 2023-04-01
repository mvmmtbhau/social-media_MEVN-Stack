const express = require('express');
const router = express.Router();

const notificationController = require('../controllers/notification.controller');

router.get('/get/:userId', notificationController.getNotisByUserId);


module.exports = router;