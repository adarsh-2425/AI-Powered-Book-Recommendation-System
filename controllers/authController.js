const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("../models/User");

//User Registration
exports.registerUser = async (req, res) => {
  const{ username, email, password } = req.body;

  try {

    //check if user exists
    const existingUser = await User.findOne({$or: [{username}, {email}]});

    if (existingUser) {
      return res.status(400).json({message: "Username or Email already exists"});
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //new user object
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    //save
    await newUser.save();

    res.status(201).json({message: "User Registered Successfully"});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server Error"});
  }
};

//Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.send(404).json({message: "User not found"});
    }

    //compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({message: "Invald Password"})
    }

    const token = jwt.sign({userId: user._id}, 'secret', {expiresIn: '1h'});

    res.status(200).json({token, user: {username: user.username, email: user.email}});
    
  } catch (err) {
    console.error(err.message);
    res.status(500).json({message: 'Server Error'})
  }
}