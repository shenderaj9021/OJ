const Bull = require('bull');
const cp = require('child_process')
const fs = require('fs');
const submission = require('../models/Submission.model');
const compare = require('../utility/compareOutputs')
// const { Queue } = require('bull');

const Docker = require('dockerode');
const Submission = require('../models/Submission.model');
const REDIS_URL = 'redis://localhost:6379'; // Adjust as needed
const globalSubmissionQueue = new Bull('global-submission-execution', REDIS_URL);
console.log("global submission  queue crated")

function convertInputString(inputString) {
  // Split the input string into individual values
  const values = inputString.split(' ');
  // Join the values with '\n' and add '\n' at the end
  const formattedInput = values.join('\n') + '\n';
  return formattedInput;
}

function performAsyncOperation(inputString, submissionId) {
  return new Promise((resolve, reject) => {
    const childProcess = cp.spawn('docker', ['exec', '-i', 'container0', 'python3', 'code/submit.py'], {
      shell: true,
    });
    let stdout = '';
    let stderr = '';

    childProcess.stdin.write(inputString);
    childProcess.stdin.end();

    childProcess.stdout.on('data', (data) => {
      stdout += data;
    });

    childProcess.stderr.on('data', (data) => {
      stderr += data;
    });

    childProcess.on('close', async (code) => {
      console.log("code ", code)
      if (code !== 0) {
        console.log("Entered into error block ")
        console.error('Error:', stderr);
        if (stderr.includes('SyntaxError')) {
          console.error('Syntax Error:', stderr);
          console.log("Updating as syntax error ");
          await Submission.findOneAndUpdate({ _id: submissionId }, { status: 'Completed', error: 'Compile Error' });
          resolve("Error");
        } else if (stderr.includes('Time Limit Exceeded')) {
          console.error('Error: Time Limit Exceeded');
          console.log("updating as Tle ")
          await Submission.findOneAndUpdate({ _id: submissionId }, { status: 'Completed', error: 'Time Limit Exceeded'});
          resolve("Error");
        } else {
          console.error('Runtime Error:', stderr);
          console.log("Updating as runtime error")
          await Submission.findOneAndUpdate({ _id: submissionId }, { status: 'Completed', error: 'Runtime Error'});
          resolve("Error");
        }
        reject(stderr);
      } else {
        console.log('Command executed successfully');
        resolve(stdout);
      }
    });
  });
}
async function processTestCases(testCases, submissionId) {
  let passedCases = 0;
  for (let i = 0; i < testCases.length; i++) {
    const inputString = convertInputString(testCases[i].input);
    try {

      const stdout = await performAsyncOperation(inputString,submissionId);
      if (stdout === 'Error') {
        await Submission.findOneAndUpdate({ _id: submissionId }, { errorAt: i + 1,passedTestCases: i });
        passedCases = -1;
        break;
      } else {
        const res = compare(stdout, testCases[i].output);
        console.log("res in processTestCases ", res)
         if (res === 'Accepted') {
          passedCases++;
        }else{
          await Submission.findOneAndUpdate({ _id: submissionId }, { errorAt: i + 1,passedTestCases: i,result:"Wrong Answer"});
          break;
        }
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle errors accordingly
    }
  }

  return passedCases;
}
const processSubmissionQueue = async (job) => {
  const { language, code,problemId,submissionId,testCases } = job.data;
  await submission.findByIdAndUpdate({_id:submissionId},{status:'Running'})
  console.log("job data in worker", job.data);
  let passedCases = 0;
  try {

    if(language==="python"){
      fs.writeFile("code/submit.py", code, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error saving code.");
        }
        passedCases = await processTestCases(testCases, submissionId);
        if (passedCases != -1) {
          await submission.findOneAndUpdate({ _id: submissionId }, { status: 'Completed', error: '',  totalcases: testCases.length })
        }
       
    
      })
    }
   
  } catch (error) {
    console.error(error);
  }
}


globalSubmissionQueue.process(processSubmissionQueue)

module.exports = globalSubmissionQueue;



