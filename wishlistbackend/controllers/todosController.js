const Todo = require("../models/Todo.js");



const createTodo = async (req, res) => {
    const newTodo = new Todo({
        title: req.body.title,
        user: req.body.user,
        completed: req.body.completed,
    });
    try {
        const savedTodo = await newTodo.save();
        return res.status(200).json({
            ok: true,
            todo: savedTodo
        });
    } catch (err) {
        return res.status(503).json({
            ok: false,
            message: "Something happened"
        })
    }
};

const updateTodo = async (req, res) => {
    try {   
        const updatedTodo = await Todo.findByIdAndUpdate(req.body._id, {
        title: req.body.title,
        completed: req.body.completed,
    }, { new: true });
        return res.status(200).json(updatedTodo);
    } catch (err) {
        return res.status(503).json({
            ok: false,
            message: "Something happened"
        })
    }
};

const getAllTodo = async (req, res) => {

    try {
        const todos = await Todo.find({ user: req.params.user })    
            console.log(todos);
        return res.status(200).json(todos);
    } catch (err) {
        return res.status(503).json({
            ok: false,
            message: "Something happened"
        });
    }
};



const deleteTodo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.todoId);
        return res.json({
            ok: true,
            message: "Task Deleted Successfully"
        });
    } catch (err) {
        return res.status(503).json({
            ok: false,
            message: "Something happened"
        })
    }
};

const deleteAllTodo = async (req, res) => {
    try {
        await Todo.deleteMany({ user: req.user.id });
        return res.json('All Todo Deleted Successfully');
    } catch (err) {
        return res.status(503).json({
            ok: false,
            message: "Something happened"
          })
    }
};



module.exports = {createTodo, deleteAllTodo, deleteTodo, getAllTodo, updateTodo}

