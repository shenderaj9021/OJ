const Router = require("express").Router();
const auth = require("../routers/auth.router");
const problem = require("../routers/problem.router");
const solve = require("../routers/solve.router")

// For authentication routes
Router.use("/auth", auth);

// For problems routes 
Router.use("",problem);
Router.use("/solve",solve);
Router.get("", (req, res) => {
  res.send("Welcome to Raj's Project");
});

module.exports = Router;
