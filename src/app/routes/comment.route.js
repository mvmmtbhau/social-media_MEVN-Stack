const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment.controller');
const { isAuthentication } = require('../middlewares/auth.middleware');

router.post('/', [isAuthentication], commentController.createComment);

router.delete('/delete/:id', [isAuthentication], commentController.deleteComment);

router.get('/:postId&:userId', [isAuthentication], commentController.getCommentsByPostId);

module.exports = router;