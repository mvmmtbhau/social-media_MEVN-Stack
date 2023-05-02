const express = require('express');
const router = express.Router();

const reportController = require('../controllers/report.controller');

router.post('/add', reportController.addNew);
router.post('/update', reportController.updateReport)

router.get('/posts', reportController.getReportPost);
router.get('/comments', reportController.getReportComment);

module.exports = router;