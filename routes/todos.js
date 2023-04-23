const express = require('express');
const { createTodo, deleteAllTodo, deleteTodo, getAllTodo, updateTodo } = require ("../controllers/todosController.js");

const router = express.Router();

router.get("/all/:user", getAllTodo);
router.post('/add', createTodo);
router.put('/edit', updateTodo);
router.delete('/deleteAll', deleteAllTodo);
router.delete('/:todoId', deleteTodo);

module.exports = router;







