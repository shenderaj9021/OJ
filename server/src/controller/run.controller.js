const globalRunQueue = require('../utility/run.queue'); // Import the Bull queue
const Run = require('../models/Run.model')

const runUserCode = async (req, res) => {

  try {
    const { language, code,testCases,user} = req.body;
    console.log("testcases in controller ", testCases);
    if (language && code) {
      // Validate the programming language (add more languages as needed)
      if (!['python', 'javascript', 'c++', 'java'].includes(language)) {
        return res.status(400).json({ message: 'Unsupported language' });
      }
      console.log("HI ",req.body)

      const newRun = await new Run({});
      newRun.code = code;
      newRun.language = language;
      newRun.testCases = testCases;
      newRun.createdBy =  user;
      const runid = newRun._id
      newRun.save();
      console.log(newRun._id)
      // Queue the user code for execution in the global queue
      const job = await globalRunQueue.add({ language, code,testCases,runid });
       // Respond with the job ID for the user to check the execution status
      res.status(202).json({ message: 'Code execution queued', runId:newRun._id });
    }else{
      res.status(400).json({message:'Invalid data recived '});
    }
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getRun = async (req,res) =>{
    try{
      const run = await Run.findOne({ _id: req.body.runId });
      if (run) {
        res.send(run);
      } else {
        res.status(404).send("No Runs exists with such runId");
      }
    }catch(err){
      res.status(401).send(err.message);
    }
}

const getAllRun = async (req,res) =>{

    try {
      const allRuns = await Run.find({});
      res.send(allRuns);
    } catch (err) {
      res.status(401).send(err.message);
    }
 
}

module.exports ={runUserCode,getRun,getAllRun}