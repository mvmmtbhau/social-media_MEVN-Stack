const express = require('express');
const router = express.Router();

const likeController = require('../controllers/like.controller');

router.post('/post', likeController.likePost);

router.delete('/post/unlike/:postId&:userId', likeController.unlikePost);

router.get('/all/:postId', likeController.getLikesByPostId);

module.exports = router;