const solveRouter = require('express').Router();

const {
    runUserCode,getAllRun,getRun
} = require('../controller/run.controller')
const {
    submitUserCode,getSubmission,getAllSubmission
}  = require('../controller/submission.controller');

const {checkToken} = require('../middlewares/JWT')
solveRouter.post('/run',checkToken,runUserCode);
solveRouter.get('/getRun',checkToken,getRun)
solveRouter.get('/getAllRun',checkToken,getAllRun);

solveRouter.post('/submit',checkToken,submitUserCode);
solveRouter.get('/getSubmission',checkToken,getSubmission);
solveRouter.get('/allSubmission',checkToken,getAllSubmission)

module.exports = solveRouter;

