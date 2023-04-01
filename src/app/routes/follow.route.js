const express = require('express');
const router = express.Router();

const followController = require('../controllers/follow.controller');

router.post('/', followController.createFollow);

router.delete('/unfollow/:userFollowed&:userFollowing', followController.deleteFollow)

module.exports = router;