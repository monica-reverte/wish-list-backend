const express = require('express');
const { isLoggedIn, login, logout, register } = require('../controllers/authController.js');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);
router.get('/is_logged_in', isLoggedIn);



module.exports = router;