const express = require('express');
const todosRoutes  = require("./todos.js");
const authRoutes = require("./auth.js");


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/todos', todosRoutes);

module.exports = router;