const express = require('express');
const router = express.Router();

const { isAuthentication } = require('../middlewares/auth.middleware');
const reportController = require('../controllers/report.controller');

router.post('/add', [isAuthentication], reportController.addNew);
router.post('/update', reportController.updateReport)

router.get('/posts', reportController.getReportPost);
router.get('/comments', reportController.getReportComment);

module.exports = router;