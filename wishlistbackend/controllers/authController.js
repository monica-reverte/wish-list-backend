const bcryptjs = require("bcrypt");
const User = require("../models/User");


const login = async (req, res) => {

  try {
    const user = await User.findOne({ email: req.body.email }).select(
      'name email password',
    );
    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "User not match"
      })
    }
    const isPasswordCorrect = await bcryptjs.compare(
      req.body.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        ok: false,
        message: "Password is incorrect"
      })

    }
    return res
      .status(200)
      .json({
        ok: true, 
        user : { id: user._id, name: user.name, email: user.email }});
  } catch (err) {
    return res.status(503).json({
      ok: false,
      message: "Something happened"
    })
  }
};

const register = async (req, res) => {

  try {

    const user = await User.findOne({email : req.body.email});
    if(user){
      return res.status(400).json({
        ok: false,
        message: "User already exists"
      })
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();


    return res.status(201).json({
      ok: true,
      user: { id: newUser._id, name: newUser.name, email: newUser.email }

    });
  } catch (err) {
    return res.status(503).json({
      ok: false,
      message: "Something happened"
    });
  }
};




module.exports = {register, login}