const express = require('express');
const { register, login, logout, isLoggedIn } = require('../controllers/authController.js');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);
router.get('/is_logged_in', isLoggedIn);



module.exports = router;