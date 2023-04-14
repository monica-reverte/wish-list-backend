const User = require("../models/User");
const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");




const register = async (req, res) => {
    const {name, email, password} = req.body;

    try{

        let user = await User.findOne({email});

        if(user) {
            return res.status(400).json({msg: "User Already Exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name, email, password: hashedPassword,
        });

        await user.save();

        const payload = {
      user: {
        id: user.id,
      },
    };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 360000});

        res.cookie("token", token, { httpOnly: true, expiresIn: 360000 });

        // const {password: pass, ...rest} = user._doc;

        res.status(201).json({msg: "User Created Successfully", user, token});

    } catch(error) {
        console.log(error.message);
        res.status(500).json({errors: "Internal Server Error"});
    }
};


const login = async (req, res) => {
    const {email, password} = req.body;

    try{

        let user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({ msg: "User Not Found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) {
            return res.status(400).json({msg: "Invalid Credencials"});
        }

        const payload = {
            user: user._id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 360000});

        res.cookie("token", token, { httpOnly: true, expiresIn: 360000 })
        const {password: pass, ...rest} = user._doc;

        res.status(200).json({msd: "User Logged In Successfully", user: rest})


    }  catch(error) {
        console.log(error.message);
        res.status(500).json({errors: "Internal Server Error"});
    }
};


const logout = async (req, res) => {

    res.clearCookie("token");
    res.status(200).json({msd: "User Logged Out Successfully" })
};


const getMe = async (req, res) => {

    try {

        const user = await User.findById(req.user);
        if(!user) {
            return res.status(404).json({msg: "User Not Found"});
        }

        const {password: pass, ...rest} = user._doc;
        return res.status(200).json({msg: "User Found", user: rest})

    }catch(error) {
    console.log(error.message);
    res.status(500).json({errors: "Internal Server Error"});
    }
};


const updateDetails = async (req, res) => {
    const {name, email} = req.body;

    try{

        let user = await User.findById(req.user);
        if(!user) {
            return res.status(404).json({msg: "User Not Found"});
        }

        let exists = await User.findOne({email});
        if(exists && exists._id.toString() !== user._id.toString()) {
            return res.status(404).json({msg: "Email Already Exists"});
        }

    user.name = name;
    user.email = email;

    await user.save();

    const {password: pass, ...rest} = user._doc;
    return res.status(200).json({msg: "User Updated Successfully", user: rest})

    }catch(error) {
        console.log(error.message);
        res.status(500).json({errors: "Internal Server Error"});
        }
};



const updatePassword = async (req, res) => {

    const {password, newPassword} = req.body;
    try{
        let user = await User.findById(req.user);
        if(!user){
            return res.status(404).json({msg: "User Not Found"})
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({msg: "Invalid Credencials"});
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        const {password: pass, ...rest} = user._doc;
        return res.status(200).json({msg: "Password Updated Successfully", user: rest})

    
    }catch(error) {
        console.log(error.message);
        res.status(500).json({errors: "Internal Server Error"});
        }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if(!user) {
            return res.status(404).json({msg: "User Not Found"})
        }
        const todo = await Todo.find({user: req.user});
        if(todo) {
            await Todo.deleteMany({user: req.user});
        }

        await user.remove();
        res.clearCookie("token");
        res.status(200).json({msg: "User Deleted Successfully"})
        

    }catch(error) {
        console.log(error.message);
        res.status(500).json({errors: "Internal Server Error"});
        }
};


module.exports = {register, login, logout, getMe, updateDetails, updatePassword, deleteUser}