const User = require("../models/User");
const Todo = require("../models/Todo");
const  jwt  = require("jsonwebtoken");
const bcrypt = require("bcrypt");




// const register = async (req, res) => {
//     const {name, email, password} = req.body;
//     try{

//         const user = await User.findOne({email});

//         if(user) {
//             return res.status(400).json({msg: "User Already Exists"});
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();

//         const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

//         res.cookie('token', token, {
//             httpOnly: true,
//             maxAge: 24 * 60 * 60 * 1000, // 1 day
//         });

//         res.status(201).json({ message: 'User registered successfully' });


//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };


// const login = async (req, res) => {
//     const {email, password} = req.body;

//     try{

//         const user = await User.findOne({email});

//         if(!user) {
//             return res.status(404).json({ msg: "User Not Found" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
        
//         if(!isMatch) {
//             return res.status(400).json({msg: "Invalid Credencials"});
//         }


//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

//         res.cookie('token', token, {
//             httpOnly: true,
//             maxAge: 24 * 60 * 60 * 1000, // 1 day
//         });

//         res.status(200).json({msg: "User Logged In Successfully"})


//     }  catch(error) {
//         console.log(error.message);
//         res.status(500).json({errors: "Internal Server Error"});
//     }
// };


const logout = async (req, res) => {

    try {
        // Clear the token cookie
        res.clearCookie('token');
    
        // Return a success response
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getMe = async (req, res) => {

    try {

        const user = await User.findById(req.userId);
        res.status(200).json({ user });


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