const express = require('express');
const router = express.Router();

const likeController = require('../controllers/like.controller');
const { isAuthentication } = require('../middlewares/auth.middleware');

router.post('/post',[isAuthentication], likeController.likePost);

router.delete('/post/unlike/:postId&:userId',[isAuthentication], likeController.unlikePost);

router.get('/all/:postId',[isAuthentication], likeController.getLikesByPostId);

module.exports = router;