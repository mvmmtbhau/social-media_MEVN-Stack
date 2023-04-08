const express = require('express');
const router = express.Router();

const followController = require('../controllers/follow.controller');

router.post('/', followController.createFollow);

router.patch('/update/:followId', followController.updateStateFollow)

router.delete('/unfollow/:fromUserId&:followUserId', followController.deleteFollow)

module.exports = router;