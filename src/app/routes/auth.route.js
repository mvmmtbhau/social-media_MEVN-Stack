const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { isAuthentication } = require('../middlewares/auth.middleware');

const { upload } = require("../utils/upload");

router.post('/login', authController.login);
router.post('/register', authController.signUp);

router.post('/update/:id', [isAuthentication], upload.array('avatar', 1), authController.updateAccount);
router.post('/change/password', [isAuthentication], authController.changePassword);
router.post('/change/privateState/:id', [isAuthentication], authController.changePrivateState);

router.get('/:id', authController.getAll);
router.get('/profile/:id', [isAuthentication], authController.getUserById);

module.exports = router;