const Bull = require('bull');
const cp = require('child_process')
const fs = require('fs');
const Run = require('../models/Run.model')

const compare = require('../utility/compareOutputs')
// const { Queue } = require('bull');



const maxExecutionTime = 5000;
const REDIS_URL = 'redis://localhost:6379'; // Adjust as needed
const globalRunQueue = new Bull('global-run-execution', REDIS_URL);
console.log("global run queue crated")
const outputFile ="output.txt"

const input = '1\n2\n';

function convertInputString(inputString) {
  // Split the input string into individual values
  const values = inputString.split(' ');

  // Join the values with '\n' and add '\n' at the end
  const formattedInput = values.join('\n') + '\n';

  return formattedInput;
}


const processRunQueue = async (job) => {
  const { language, code, expectedOutput,input, runid } = job.data;
  await Run.findOneAndUpdate({ _id: runid }, { status: 'Running' })
  console.log("job data in worker", job.data);

  try {
    if(language==="python"){


   
    fs.writeFile('code/run.py', code, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error saving code.');
      }
    
      // Set the input for the Python script
      const inputString = convertInputString(input) // Example input: "1\n2\n"

      const childProcess = cp.spawn('docker', ['exec', '-i', 'container0', 'python3', 'code/run.py'], {
        shell: true,
      });
      
      childProcess.stdin.write(inputString);
      childProcess.stdin.end();
      
      let stdout = '';
      let stderr = '';
      
      childProcess.stdout.on('data', (data) => {
        stdout += data;
      });
      
      childProcess.stderr.on('data', (data) => {
        stderr += data;
      });
      
    
      childProcess.on('close', async (code) => {
        if (code !== 0) {
          console.error('Error:', stderr);
          if (stderr.includes('SyntaxError')) {
            console.error('Syntax Error:', stderr);
            await Run.findOneAndUpdate({ _id: runid }, { status: 'Completed', error: stderr, passedTestCases: 0 });
          } else if (stderr.includes('Time Limit Exceeded')) {
            console.error('Error: Time Limit Exceeded');
            await Run.findOneAndUpdate({ _id: runid }, { status: 'Completed', error: 'Time Limit Exceeded', passedTestCases: 0 });
          } else {
            console.error('Runtime Error:', stderr);
            await Run.findOneAndUpdate({ _id: runid }, { status: 'Completed', error: 'Runtime Error', passedTestCases: 0 });
          }
        } else {
          console.log('Command executed successfully');
          const res = compare(stdout, expectedOutput);
          if (res === 'Accepted') {
            await Run.findOneAndUpdate({ _id: runid }, { status: 'Completed', error: '', passedTestCases: 1 });
          } else {
            await Run.findOneAndUpdate({ _id: runid }, { status: 'Completed', error: '', passedTestCases: 0 });
          }
          console.log('Output:', stdout);
        }
      });
    });
  }else if( language==="c++"){
    if (fs.existsSync("code/output.txt")) {
      fs.unlinkSync("code/output.txt");
  }
      
    // fs.writeFile("code/runc.cpp", code, async (err) => {
    //   if (err) {
    //     console.error(err);
    //     return res.status(500).send("Error saving code.");
    //   }
    //   // Set the maximum execution time in milliseconds
    //   const maxExecutionTime = 5000; // 5 seconds
    //   // Execute the command with a timeout
    //   const childProcess = cp.exec(
    //     `docker exec container0 sh -c "g++ code/runc.cpp -o code/runc && code/runc > code/output.txt 2>&1"`,
    //     async (error, stdout, stderr) => {
         
    //       if (error) {
    //         console.error("Error:", error.message);
    //         if (stderr.includes("SyntaxError")) {
    //           console.error("Syntax Error: in output ", stderr);
    //           await Run.findOneAndUpdate({ _id: runid }, { status: 'Completed', error: stderr, passedTestCases: 0 })

    //         } else if (stderr.includes("Time Limit Exceeded in outpuot")) {
    //           console.error("Error: Time Limit Exceeded");
    //           await Run.findOneAndUpdate({ _id: runid }, { status: 'Completed', error: "Time Limit Exceeded", passedTestCases: 0 })

    //         } else {
    //           console.error("Runtime Error: in output", stderr);
    //           await Run.findOneAndUpdate({ _id: runid }, { status: 'Completed', error: "Runtime Error", passedTestCases: 0 })
    //         }
    //       } else {
         
    //         fs.readFile("code/output.txt", 'utf8', async (err, data) => {
    //           if (err) {
    //               console.error('Error reading output file:', err);
    //               // Handle the error
    //           } else {
    //               console.log('Output from file:', data);
          
    //               // Parse the output as needed
    //               // For example, split the lines of the output
    //               const outputLines = data.split('\n');
    //                const parsedOutput = outputLines.join(' ');
    //                console.log("Command executed successfully");
    //                const res = compare(parsedOutput, expectedOutput)
    //                console.log("Resuslt ",res);
    //                if (res === "Accepted") {
    //                  await Run.findOneAndUpdate({ _id: runid }, { status: 'Completed', error: "", passedTestCases: 1 })
    //                } else {
    //                  await Run.findOneAndUpdate({ _id: runid }, { status: 'Completed', error: "", passedTestCases: 0 })
    //                }
    //                console.log("Output:", stdout);
                
    //           }
    //       });
           
    //       }
    //     }
    //   );

    //   // Set a timeout to kill the process if it exceeds the maximum execution time
    //   const timeout = setTimeout(() => {
    //     childProcess.kill(); // Kill the child process
    //     console.error("Error: Command execution timed out");

    //   }, maxExecutionTime);

    // })
  }
  } catch (error) {
    console.error(error);
  }
}

globalRunQueue.process(processRunQueue);
module.exports = globalRunQueue;



