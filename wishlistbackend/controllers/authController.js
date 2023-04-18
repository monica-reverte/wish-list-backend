const bcrypt = require("bcrypt");
const User = require("../models/User");
const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");

const register = async(req, res) => {

    if(!req.body.name || !req.body.email || !req.body.password ){
        return res.json("required field name, email, password")
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
        return res.status(500).json('Server error');
    }

}

const login = async(req,res) => {
    if(!req.body.email || !req.body.password){
        return res.json("required field name, password")
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
        return res.status(500).json('Server error');
    }
    
}
module.exports = {register, login }