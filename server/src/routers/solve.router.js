const solveRouter = require('express').Router();

const {
    runUserCode,getAllRun,getRun
} = require('../controller/run.controller')
const {
    submitUserCode,getSubmission,getAllSubmission,getProblemSubmission
}  = require('../controller/submission.controller');

const {checkToken} = require('../middlewares/JWT')
solveRouter.post('/run',checkToken,runUserCode);
solveRouter.post('/getRun',checkToken,getRun)
solveRouter.get('/getAllRun',checkToken,getAllRun);

solveRouter.post('/submit',checkToken,submitUserCode);
solveRouter.post('/getSubmission',checkToken,getSubmission);
solveRouter.get('/allSubmission',checkToken,getAllSubmission)
solveRouter.post('/getProblemSub', checkToken,getProblemSubmission)

module.exports = solveRouter;

