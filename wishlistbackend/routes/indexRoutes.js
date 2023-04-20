const express = require('express');
const todosRoutes  = require("./todos.js");
const authRoutes = require("./auth.js");
const usersRoutes = require("./users.js");


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/todos', todosRoutes);

module.exports = router;