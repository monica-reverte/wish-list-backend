
const Todo = require("../models/Todo");


const getTodos = async (req, res) => {

    try {
        const todos = await Todo.find({user: req.user});
        res.status(200).json({msg: "Todo Found", todos})

    }catch(error) {
        console.log(error.message);
        res.status(500).json({errors: "Internal Server Error"});
    }
};

const getTodo = async (req, res) => {

    const {id} = req.params;

    try {

        const todo = await Todo.findById(id);
        if(!todo) {
            res.status(404).json({msg: "Todo Not Found"});
        }
        if(todo.user.toString() !== req.user) {
            res.status(401).json({msg: "Not Authorized"});
        }

        res.status(200).json({msg: "Todo Found", todo})


    }catch(error) {
        console.log(error.message);
        res.status(500).json({errors: "Internal Server Error"});
    }
};

const createTodo = async (req, res) => {

    const {title, body} = req.body;

    try {
        const todo = await Todo.create({ title, body, completed: false, user: req.user});
        res.status(200).json({msg: "Todo Created Successfully", todo})

    }catch(error) {
        console.log(error.message);
        res.status(500).json({errors: "Internal Server Error"});
    }
};

const updateTodo = async (req, res) => {

    const {id} = req.params;
    const {title, body, completed} = req.body;

    try {
        const todo = await Todo.findById(id);
        if(!todo) {
            return res.status(404).json({msg: "Todo Not Found"});
        }

        if(todo.user.toString() !== req.user) {
            return res.status(401).json({msg: "Not Authorized"})
        }

        todo.title = title;
        todo.body = body;
        todo.completed = completed;

        await todo.save();
        res.status(200).json({msg: "Todo Updated Successfully"})

    }catch(error) {
        console.log(error.message);
        res.status(500).json({errors: "Internal Server Error"});
    }
};

const deleteTodo = async (req, res) => {

    const {id} = req.params;


    try {
        const todo = await Todo.findById(id);
        if(!todo) {
            return res.status(404).json({msg: "Todo Not Found"});
        }

        if(todo.user.toString() !== req.user) {
            return res.status(401).json({msg: "Not Authorized"})
        }
        
        await todo.remove();
        res.status(200).json({msg:"Todo Deleted Successfully"});

    }catch(error) {
        console.log(error.message);
        res.status(500).json({errors: "Internal Server Error"});
    }
};

module.exports = {getTodos, getTodo, createTodo, updateTodo, deleteTodo};
