const express = require('express');
const router = express.Router();

const followController = require('../controllers/follow.controller');
const { isAuthentication } = require('../middlewares/auth.middleware');

router.post('/',[isAuthentication], followController.createFollow);

router.patch('/update/:followId',[isAuthentication], followController.updateStateFollow)

router.delete('/unfollow/:fromUserId&:followUserId',[isAuthentication], followController.deleteFollow)

module.exports = router;