const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment.controller');
const { isAuthentication } = require('../middlewares/auth.middleware');


router.post('/', commentController.createComment);

router.get('/:postId', commentController.getCommentsByPostId);

module.exports = router;