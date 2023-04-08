const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

const { upload } = require("../utils/upload");

router.post('/login', authController.login);
router.post('/register', authController.signUp);

router.post('/update/:id', upload.array('avatar', 1), authController.updateAccount);
router.post('/change/password', authController.changePassword);
router.post('/change/privateState/:id', authController.changePrivateState);

router.get('/', authController.getAll);
router.get('/profile/:id', authController.getUserById);

module.exports = router;