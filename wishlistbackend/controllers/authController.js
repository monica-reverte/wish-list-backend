const bcrypt = require("bcrypt");
const User = require("../models/User");
const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

const register = async(req, res, next) => {

    if(!req.body.name || !req.body.email || !req.body.password ){
        return next(createError({ status: 400, message: "Name, email, password is required"}));
    }

    try{

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json("New User Created")

    } catch(err){
        console.log(err);
        return next(err);
    }

}

const login = async(req, res, next) => {
    if(!req.body.email || !req.body.password){
        return next(createError({ status: 400, message: "Email and password is required"}));
    }

    try{
        const user = await User.findOne({ email: req.body.email }).select(
            'name email password',
        );
        if(!user){
            return res.status(404).json("no user found");
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return res.json("password is incorrect");
        }
        const payload = {
            id: user._id,
            name: user.name
        }  

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d'})
        return res.cookie("access_token", token, { httpOnly: true }).status(200).json({'message': "login success"})
    }catch(err){
        console.log(err);
        return next(err);
    }
    
}
module.exports = {register, login }