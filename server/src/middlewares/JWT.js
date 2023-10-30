require("dotenv").config();
const User = require("../models/user.model");
const tokenRouter = require("express").Router();
const res = require("express/lib/response");
const JWT = require("jsonwebtoken");

async function generateToken(user) {

  const token = await JWT.sign(
    {
      id: user._id,
    },
    process.env.jwtSecret,
    {
      expiresIn: 60000000000,
    }
  );
  return token;
}

async function checkToken(req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.slice(7);
 
  JWT.verify(token, process.env.jwtSecret, (err, decoded) => {
    if (err) {
     
      return res.status(401).json({ message: 'Unauthorized 1' });
    }
    console.log("Decoded user is",decoded)
    req.user = decoded.id;
    next();
  });
}

module.exports = { generateToken, checkToken };