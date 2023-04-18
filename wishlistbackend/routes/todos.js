const express = require('express');
const { createTodo, deleteAllTodo, deleteTodo, getAllTodo, getCurrentUserTodo, updateTodo } = require ("../controllers/todosController.js");

const router = express.Router();

router.get('/all', getAllTodo);
router.post('/', createTodo);
router.put('/:taskId', updateTodo);
router.get('/myTasks', getCurrentUserTodo);
router.delete('/deleteAll', deleteAllTodo);
router.delete('/:taskId', deleteTodo);

module.exports = router;







