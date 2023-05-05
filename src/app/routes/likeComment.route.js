const express = require('express');
const router = express.Router();

const { isAuthentication } = require('../middlewares/auth.middleware');
const likeCommentController = require('../controllers/likeComment.controller');

router.post('/like', [isAuthentication], likeCommentController.likeComment);

router.delete('/unlike/:commentId&:userId', [isAuthentication], likeCommentController.unlikeComment);

router.get('/all/:commentId', [isAuthentication], likeCommentController.getLikesByCommentId);

module.exports = router;