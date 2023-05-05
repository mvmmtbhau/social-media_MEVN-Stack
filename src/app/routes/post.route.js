const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller');
const { isAuthentication } = require('../middlewares/auth.middleware');
const { upload } = require("../utils/upload");

router.post('/', [isAuthentication] , upload.array('photos', 4), postController.createPost);
router.post('/savedPost',[isAuthentication], postController.userSavedPost);
router.post('/removeSavedPost',[isAuthentication], postController.userRemoveSavedPost);

router.delete('/delete/:id',[isAuthentication], postController.removePostById);

router.get('/:userId',[isAuthentication], postController.getAllPost);
router.get('/detail/:postId&:userId',[isAuthentication], postController.getPostById);



module.exports = router;