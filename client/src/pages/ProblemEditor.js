import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Requests } from '../utils';
// import 'ace-builds/src-noconflict/mode-javascript';
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github"; // Choose a theme
import 'ace-builds/src-noconflict/theme-monokai';
// import "brace/mode/c_cpp";
import "brace/snippets/c_cpp";
// import "brace/ext/language_tools";



const ProblemEditor = (props) => {
  const { problemId } = useParams();
  const [problemdata, setProblemdata] = useState({})

  const vals = {
    C: `#include <stdio.h>
int main(){
  // Your code here
  return 0;
}`,
    "C++": `#include <bits/stdc++.h>
using namespace std;
int main(){
  // Your code here
  return 0;
}`,
    Java: `public class Main{
    public static void main(String[] args){
      // your code here
    }
}`,
    Python: `# Your code here`,
  };

  const [isCustomTestCase, setIsCustomTestCase] = useState(false);
  const [testCaseInput, setTestCaseInput] = useState("");
  const [output, setOutput] = useState("");
  const [testCasesPassed, setTestCasesPassed] = useState(0);
  const [defaultTestCases,setDefaultTestCases] = useState([]);
  const [totalTestCases,setTotalTestCases] = useState(0);
  const [code, setCode] = useState("");
  const [lang, setLang] = useState("Python");
  const [values, setValues] = useState(vals);
  const [running,setRunning] = useState(false);
  const [submitting,setSubmitting] = useState(false);

  const languageIds = {
    Python: 71,
    C: 75,
    "C++": 76,
    Java: 62,
  };
  const modes = {
    "C++": "c_cpp",
    C: "c_cpp",
    Java: "java",
    Python: "python",
  };
  useEffect(() => {
    // Fetch problem data based on the problemId from the backend API
    Requests.getProblem(problemId)
      .then(async (response) => {
        console.log("res ", response)
        console.log(response.data)
        await setProblemdata(response.data); // Update state with fetched problem data
        await setDefaultTestCases(response.data.testCases);

      })
      .catch((error) => {
        console.error('Error fetching problem data:', error);
      });
  }, [problemId]);
  // Function to handle running the code
  const handleRunCode = () => {
    setRunning(true);
    const data ={
      "language": "python",
      "code": values["Python"],
      "testCases":problemdata.testCases
    };

    // Send the initial request to run the code and get the runId
    Requests.runCode(data)
      .then((res) => {
        const runId = res.data.runId;
        console.log("Code is running with runId:", runId);
        const ob ={
          "runId":runId
        }
        // Set up an interval to query the server every 2 seconds (adjust the interval as needed)
        const intervalId = setInterval(() => {
          // Query the server with the runId to get the status
          Requests.getRunInfo(ob)
            .then((statusRes) => {
              const status = statusRes.data.status;
              console.log("Code execution status:", status);
              // Check if the code execution is completed
              if (status === "Completed") {
                // Code execution completed, do something with the result if needed
                console.log("execution completed ", statusRes);
                clearInterval(intervalId); // Clear the interval since the execution is completed
                setTestCasesPassed(statusRes.data.passedTestCases)
                setTotalTestCases(statusRes.data.totalcases)
                console.log("execution completed ", statusRes);
                setRunning(false);
              } else if (status === "failed") {
                // Code execution failed, handle the failure if needed
                clearInterval(intervalId); // Clear the interval
                console.log("execution failed ", statusRes);
                setRunning(false);
              }
            })
            .catch((statusErr) => {
              // Handle errors while querying the status if needed
              console.error("Error querying code status:", statusErr);
              setRunning(false);
              clearInterval(intervalId); // Clear the interval on error
            });
        }, 10000); // Interval set to 2 seconds (2000 milliseconds), adjust as needed
      })
      .catch((err) => {
        console.error("Error running code:", err);
        setRunning(false);
        // Handle the initial run code request error if needed
      });
  };
  

  // Function to handle submitting the code
  const handleSubmitCode = () => {
    setSubmitting(true);
    const data ={
      "language": "python",
      "code": values["Python"],
      "problemId":problemId,
      "testCases":problemdata.testCases
    };
    console.log("sending data ", data)
    // Send the initial request to run the code and get the runId
    Requests.submitCode(data)
      .then((res) => {
        const submissionId = res.data.submissionId;
        console.log("Code is running with SubmissionId:", submissionId);
        const ob ={
          "submissionId":submissionId
        }
        // Set up an interval to query the server every 2 seconds (adjust the interval as needed)
        const intervalId = setInterval(() => {
          // Query the server with the runId to get the status
          Requests.getSubmission(ob)
            .then((statusRes) => {
              const status = statusRes.data.status;
              console.log("Code execution status:", status);
              // Check if the code execution is completed
              if (status === "Completed") {
                // Code execution completed, do something with the result if needed
                console.log("execution completed ", statusRes);
                clearInterval(intervalId); // Clear the interval since the execution is completed
                setTestCasesPassed(statusRes.data.passedTestCases)
                setTotalTestCases(statusRes.data.totalcases)
                console.log("execution completed ", statusRes);
                setSubmitting(false);
              } else if (status === "failed") {
                // Code execution failed, handle the failure if needed
                clearInterval(intervalId); // Clear the interval
                console.log("execution failed ", statusRes);
                setSubmitting(false);
              }
            })
            .catch((statusErr) => {
              // Handle errors while querying the status if needed
              console.error("Error querying code status:", statusErr);
              setSubmitting(false);
              clearInterval(intervalId); // Clear the interval on error
            });
        }, 10000); // Interval set to 2 seconds (2000 milliseconds), adjust as needed
      })
      .catch((err) => {
        console.error("Error running code:", err);
        setSubmitting(false);
        // Handle the initial run code request error if needed
      });
   };

  function onChange(newValue) {
    const newvals = { ...values };
    newvals[problemId] = newValue;
    newvals[lang] = newValue;
    setValues(newvals);
    localStorage.setItem(problemId, JSON.stringify(newvals));
    localStorage.setItem("user-code", JSON.stringify(newvals));
  }

  return (
    <div className="container mx-auto p-4 flex text-left">

      {/* Left Part */}
      <div className="w-1/2 border-r border-gray-300 p-4">
        <h1 className="text-2xl font-semibold mb-4">{problemdata.title}</h1>
        <p><span className="font-bold">Description: </span>{problemdata.description}.</p>
        <p><span className="font-bold">Difficulty Level: </span>{problemdata.difficultyLevel}.</p>
        <p><span className="font-bold"> Input Format:</span>{problemdata.inputFormat}</p>
        <p><span className="font-bold"> Memory Limit :</span>{problemdata.memoryLimitInMB}</p>
        <p><span className="font-bold"> Ouput Format :</span>{problemdata.outputFormat}</p>
        <div>
          <div>
            <span className="font-bold"> TestCases :</span>
            {problemdata && problemdata.testCases ? (
              problemdata.testCases.map((testCase, index) => (
                <div key={testCase._id}>
                  <h3>TestCase :{index + 1}</h3>
                  <p>Input: {testCase.input}</p>
                  <p>Output: {testCase.output}</p>
                  <br /> <br />
                </div>
              ))
            ) : (
              <span>No test cases available</span>
            )}
            <div>
              <p><span className="font-bold"> Time Limit  :</span>{problemdata.timeLimitInSeconds
              } sec</p>
            </div>
            <div className="flex flex-wrap">
              <span className="font-bold"> Tags :</span>
              {problemdata && problemdata.tags ? (
                problemdata.tags.map((tag, index) => (
                  <div key={index} className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 m-1">
                    {tag}
                  </div>
                ))
              ) : (
                <span>No tags available</span>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Right Part */}
      <div className="w-1/2 p-2">
        {/* Language Selection */}
        <div className="mb-2 ">
          <select
            className=" bg-none b-2 m-2"
            name="languages"
            onChange={(e) => {
              setLang(e.target.value);
            }}
          >
            {/* <option value="C++">C++</option>
            <option value="C">C</option> */}

            <option value="Python">Python</option>
          </select>

          <AceEditor
            mode={modes[lang]}
            theme="monokai"
            width="100%"
            onChange={onChange}
            className="editor-main bg-black/40 text-sm b-2 m-2"
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            value={values[lang]}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 4,
            }}
          />

          {/* Custom/Predefined Test Case Toggle */}
          <div className="flex items-center mb-4">
            <label className="mr-2">Custom Test Case:</label>
            <input
              type="checkbox"
              className="mr-2"
              checked={isCustomTestCase}
              onChange={() => setIsCustomTestCase(!isCustomTestCase)}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Run Custom Test
            </button>
          </div>
        </div>

        {/* Test Case Input */}
        <div className="mb-4">
          <textarea
            rows="4"
            cols="50"
            value={testCaseInput}
            onChange={(e) => setTestCaseInput(e.target.value)}
            readOnly={!isCustomTestCase}
            className="border p-2 w-full"
          />
        </div>

        {/* Output */}
        <div className="mb-4">
          <h2>Output:</h2>
          <pre>{output}</pre>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleRunCode}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
          {
              running ?  <div class="flex gap-2">
                            <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
                            <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
                            <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
                          </div> 
                      : <div className="px-6">Run</div>
          }
          </button>
          <button
            onClick={handleSubmitCode}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Submit
          </button>
          {
            totalTestCases===0  ? <p></p>
                                : <p>{testCasesPassed}/{totalTestCases} Testcases Passed</p>
          }
         
        </div>
      </div>
    </div>
  );
};

export default ProblemEditor;
