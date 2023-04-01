const express = require('express');
const router = express.Router();

const searchController = require('../controllers/search.controller');

router.post('/save', searchController.saveNewSearch);
router.post('/remove', searchController.updateSearchWithRemove);
router.post('/removeAll', searchController.updateSearchWithRemoveAll);

router.get('/searching/:userId&:key', searchController.searching);
router.get('/get/:userId', searchController.getHistoryByUserId);

module.exports = router;