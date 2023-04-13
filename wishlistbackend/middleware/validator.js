const {check} = require("express-validator");

const registerRules = [
    check("name", "Name is Required").notEmpty().trim().escape(),
    check("email", "Please give valid Email").isEmail().normalizeEmail(),
    check("password", "Password shoulg be 6 or more characters").isLength({min:6})
];


const loginRules = [
    check("email", "Please give valid Email").isEmail().normalizeEmail(),
    check("password", "Password shoulg be 6 or more characters").isLength({min:6})
]

const updateDetailsRules = [

    check("name", "Name is Required").notEmpty().trim().escape(),
    check("email", "Please give valid Email").isEmail().normalizeEmail(),
    check("password", "Password shoulg be 6 or more characters").isLength({min:6})
];

const updatePasswordRules = [
    check("password", "Password shoulg be 6 or more characters").isLength({min:6}),
    check("newPassword", "Password shoulg be 6 or more characters").isLength({min:6})
];

const createTodoRules = [
    check("title", "Title is required").notEmpty().trim().escape(),
    check("body", "Description is required").notEmpty().trim().escape()
];

const updateTodoRules = [
    check("title", "Title is required").notEmpty().trim().escape(),
    check("body", "Description is required").notEmpty().trim().escape(),
    check("completed", "Completed is required").notEmpty().trim().escape().isBoolean()
];



module.exports = {registerRules, loginRules, updateDetailsRules, updatePasswordRules, createTodoRules, updateTodoRules}