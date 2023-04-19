const express = require('express');
const { createTodo, deleteAllTodo, deleteTodo, getAllTodo, getCurrentUserTodo, updateTodo } = require ("../controllers/todosController.js");

const router = express.Router();

router.get('/all', getAllTodo);
router.post('/', createTodo);
router.put('/:todoId', updateTodo);
router.get('/myTodos', getCurrentUserTodo);
router.delete('/deleteAll', deleteAllTodo);
router.delete('/:todoId', deleteTodo);

module.exports = router;







