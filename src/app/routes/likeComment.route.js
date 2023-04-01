const express = require('express');
const router = express.Router();

const likeCommentController = require('../controllers/likeComment.controller');

router.post('/like', likeCommentController.likeComment);

router.delete('/unlike/:commentId&:userId', likeCommentController.unlikeComment);

router.get('/all/:commentId', likeCommentController.getLikesByCommentId);

module.exports = router;