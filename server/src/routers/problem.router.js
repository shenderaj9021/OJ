const problemRouter = require("express").Router();
const {
    createProblem,
    updateProblemById,
    getAllProblems,
    getProblemById,
    
} = require("../controller/problem.controller");
const { checkToken } = require("../middlewares/JWT");

problemRouter.post("/problem",checkToken, createProblem);
problemRouter.get("/problem", getAllProblems);
problemRouter.put("/problem/:id",checkToken,updateProblemById);
problemRouter.get("/problem/:id",getProblemById);

module.exports = problemRouter;