const Bull = require('bull');
const cp = require('child_process')
const fs = require('fs');
const submission = require('../models/Submission.model');
const compare = require('../utility/compareOutputs')
// const { Queue } = require('bull');

const Docker = require('dockerode');

const REDIS_URL = 'redis://localhost:6379'; // Adjust as needed
const globalSubmissionQueue = new Bull('global-submission-execution', REDIS_URL);
console.log("global submission  queue crated")


const processSubmissionQueue = async (job) => {
  const { language, code, expectedOutput, submissionId } = job.data;
  await submission.findByIdAndUpdate({_id:submissionId},{result:'Running'})
  console.log("job data in worker", job.data);

  try {

    fs.writeFile("code/submit.py", code, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error saving code.");
      }
      // Set the maximum execution time in milliseconds
      const maxExecutionTime = 5000; // 5 seconds
      // Execute the command with a timeout
      const childProcess = cp.exec(
        'docker exec container0 sh -c "python3 code/submit.py"',
        async (error, stdout, stderr) => {
          if (error) {
            console.error("Error:", error.message);
            if (stderr.includes("SyntaxError")) {
              console.error("Syntax Error:", stderr);
              await submission.findOneAndUpdate({ _id: submissionId }, { result: 'Compile Error' })

            } else if (stderr.includes("Time Limit Exceeded")) {
              console.error("Error: Time Limit Exceeded");
              await submission.findOneAndUpdate({ _id: submissionId }, { result: 'Time Limit Exceeded'})

            } else {
              console.error("Runtime Error:", stderr);
              await submission.findOneAndUpdate({ _id: submissionId }, { result: 'Runtime Error'})
            }
          } else {
            console.log("Command executed successfully");
            const res = compare(stdout, expectedOutput)
            if (res === "Accepted") {
              await submission.findOneAndUpdate({ _id: submissionId }, { result: 'Accepted' })
            } else {
              await submission.findOneAndUpdate({ _id: submissionId }, { result: 'Wrong Answer' })
            }
            console.log("Output:", stdout);
          }
        }
      );

      // Set a timeout to kill the process if it exceeds the maximum execution time
      const timeout = setTimeout(() => {
        childProcess.kill(); // Kill the child process
        console.error("Error: Command execution timed out");

      }, maxExecutionTime);

    })
  } catch (error) {
    console.error(error);
  }
}


globalSubmissionQueue.process(processSubmissionQueue)

module.exports = globalSubmissionQueue;



