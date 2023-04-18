const express = require('express');
const { getUserInfo, updateUser } = require('../controllers/userControllers.js');

const router = express.Router();

router.get("/me", getUserInfo);
router.put("/me", updateUser)


module.exports = router;