const Todo = require("../models/Todo");
const createError = require("../utils/createError");

const createTodo = async (req, res, next) => {
    const newTodo = new Todo({
        title: req.body.title,
        user: req.user.id,
        completed: req.body.completed,
    });
    try {
        const savedTodo = await newTodo.save();
        return res.status(200).json(savedTodo);
    } catch (err) {
        return next(err);
    }
};

const updateTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.todoId).exec();
        if (!todo) return next(createError({ status: 404, message: 'Todo not found' }));
        if (todo.user.toString() !== req.user.id) return next(createError({ status: 401, message: "It's not your todo." }));
        
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.todoId, {
        title: req.body.title,
        completed: req.body.completed,
    }, { new: true });
        return res.status(200).json(updatedTodo);
    } catch (err) {
        return next(err);
    }
    };

const getAllTodo = async (req, res, next) => {
    try {
        const todos = await Todo.find({});
        return res.status(200).json(todos);
    } catch (err) {
        return next(err);
    }
};

const getCurrentUserTodo = async (req, res, next) => {
    try {
        const todo = await Todo.find({ user: req.user.id });
        return res.status(200).json(todo);
    } catch (err) {
        return next(err);
    }
};

const deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.todoId);
        if (todo.user === req.user.id) {
        return next(createError({ status: 401, message: "It's not your todo." }));
    }
        await Todo.findByIdAndDelete(req.params.todoId);
        return res.json('Todo Deleted Successfully');
    } catch (err) {
        return next(err);
    }
};

const deleteAllTodo = async (req, res, next) => {
    try {
        await Todo.deleteMany({ user: req.user.id });
        return res.json('All Todo Deleted Successfully');
    } catch (err) {
        return next(err);
    }
};


module.exports = {createTodo, deleteAllTodo, deleteTodo, getAllTodo, getCurrentUserTodo, updateTodo}

