const globalSubmissionQueue = require('../utility/submission.queue');
const Submission = require('../models/Submission.model');

const submitUserCode = async (req,res) =>{

    try {
        const { language,code,problemId,testCases,user} = req.body;
        if (language && code) {
            // Validate the programming language (add more languages as needed)
            if (!['python', 'javascript', 'c++', 'java'].includes(language)) {
              return res.status(400).json({ message: 'Unsupported language' });
            }
            const newSubmission = await new Submission({
              code:code,
              language:language,
              problem:problemId,
              user:user,
              testCases:testCases
            });
            
      
            const submissionId = newSubmission._id
            newSubmission.save();
            // Queue the user code for execution in the global queue
            const job = await globalSubmissionQueue.add({ language,code,problemId,submissionId,testCases});
             // Respond with the job ID for the user to check the execution status
            res.status(202).json({ message: 'Code Submission queued', submissionId:newSubmission._id });
          }else{
            res.status(400).json({message:'Invalid data recived '});
          }
    }catch(error){
      console.error(error);
      res.status(500).json({message:'Server Error'})
    }
}

const getSubmission  = async (req,res) =>{
  try {
    const sid =req.body.submissionId;
     const sub = await Submission.findOne({_id:sid});
     if(sub){
       res.send(sub);
     }else {
       res.status(404).send(`No Submission Exists with such Submission ID ${req.body.submissionId} `);
     }
  }catch(err){
    res.status(401).send(err.message);
  }
}
const getAllSubmission = async (req,res )=>{
  try {
    const allSub = await Submission.find({});
    res.send(allSub);
  }catch(err){
    res.status(401).send(err.message)
  }
}

module.exports =  { submitUserCode,getSubmission,getAllSubmission}