const express = require('express');
const router = express.Router();

const reportController = require('../controllers/report.controller');

router.post('/add', reportController.addNew);


module.exports = router;