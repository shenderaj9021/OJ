require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/JWT");
const nodemailer = require("nodemailer");


// Register a new user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email is already in use
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email is already in use' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 9);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Create a JWT token for the user
    const token = await generateToken(newUser);

    res.status(201).json({ token, user: { id: newUser._id, username: newUser.username } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a user
const login = async (req, res) => {
 
  const {username,password} = req.body;
  const userExist = await User.findOne({ username: username }).lean();

  if (!userExist) {
    return res.status(400).json({ msg: "Invalid Credentials" });
  }

  const isMatch = await bcrypt.compare(password, userExist.password);

  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid Credentials 1" });
  }

  const token = await generateToken(userExist);
  res.json({
    ...userExist,
    token,
  });
};


const getProfile = async(req, res)=> {
  const userID = req.body.userID;
  const profile = await User.findById(userID);
  if (!profile) {
    return res.status(404).send("User not found");
  }
  res.send(profile);
}

module.exports = { register, login, getProfile };
