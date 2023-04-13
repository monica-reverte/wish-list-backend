const express = require('express');
const {register, login, logout, getMe, updateDetails, updatePassword, deleteUser} = require("../controllers/userController");
const authorize = require('../middleware/auth');
const { registerRules, loginRules, updateDetailsRules, updatePasswordRules } = require('../middleware/validator');
const validateResult = require('../middleware/validationResult');

const router = express.Router();

router.post("/register", registerRules, validateResult, register);

router.post("/login", loginRules, validateResult, login);

router.get("/logout", authorize, logout);

router.get("/me", authorize, getMe);

router.put("/updatedetails",  authorize, updateDetailsRules, validateResult, updateDetails);

router.put("/updatepassword", authorize, updatePasswordRules, validateResult, updatePassword);

router.delete("/delete", authorize, deleteUser);

module.exports = router;
