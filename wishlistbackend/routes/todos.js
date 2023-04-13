const express = require('express');
const authorize = require('../middleware/auth');
const {getTodos, getTodo, createTodo, updateTodo, deleteTodo} = require("../controllers/todosController");
const { createTodoRules, updateTodoRules } = require('../middleware/validator');
const validateResult = require('../middleware/validationResult');

const router = express.Router();


router.get("/:id", authorize, getTodo);

router.get("/", authorize, getTodos);

router.post("/create", authorize, createTodoRules, validateResult, createTodo);

router.put("/update/:id", authorize, updateTodoRules, validateResult, updateTodo);

router.delete("/delete/:id", authorize, deleteTodo);


module.exports = router;