const express = require('express');
const router = express.Router();

const optionReportController = require('../controllers/optionReport.controller');

router.post('/add', optionReportController.addNew);

router.patch('/update/:id', optionReportController.updateOption);

router.delete('/delete/:id', optionReportController.deleteOption);

router.get('/all', optionReportController.getOptions);
router.get('/', optionReportController.getAll);


module.exports = router;