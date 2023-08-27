const Router = require("express").Router();
const auth = require("../routers/auth.router");

Router.use("/auth", auth);

Router.get("", (req, res) => {
  res.send("Welcome to Xenia-Verse");
});

module.exports = Router;
