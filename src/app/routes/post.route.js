const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller');
const { isAuthentication } = require('../middlewares/auth.middleware');
const { upload } = require("../utils/upload");

router.post('/', upload.array('photos', 4), postController.createPost);
router.post('/savedPost', postController.userSavedPost);
router.post('/removeSavedPost', postController.userRemoveSavedPost);

router.delete('/:id', postController.removePostById);

router.get('/',[isAuthentication], postController.getAllPost);
router.get('/detail/:id', postController.getPostById);



module.exports = router;