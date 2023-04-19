const express = require('express');
const todosRoutes  = require("./todos.js");
const authRoutes = require("./auth.js");
const usersRoutes = require("./users.js");
const checkAuth = require('../utils/checkAuth.js');

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/todos", checkAuth, todosRoutes);
router.use("/users", checkAuth, usersRoutes);

module.exports = router;