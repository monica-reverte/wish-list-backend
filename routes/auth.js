const express = require('express');
const { login, register, firebaseLogin } = require('../controllers/authController.js');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/firebase', firebaseLogin);


module.exports = router;