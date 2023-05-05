const express = require('express');
const router = express.Router();

const searchController = require('../controllers/search.controller');
const { isAuthentication } = require('../middlewares/auth.middleware');

router.post('/save', [isAuthentication], searchController.saveNewSearch);
router.post('/remove', [isAuthentication], searchController.updateSearchWithRemove);
router.post('/removeAll', [isAuthentication], searchController.updateSearchWithRemoveAll);

router.get('/searching/:userId&:key', [isAuthentication], searchController.searching);
router.get('/get/:userId', [isAuthentication], searchController.getHistoryByUserId);

module.exports = router;