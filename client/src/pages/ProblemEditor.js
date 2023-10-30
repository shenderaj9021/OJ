import React, { useState } from "react";
import AceEditor from "react-ace";

// import 'ace-builds/src-noconflict/mode-javascript';
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github"; // Choose a theme
import 'ace-builds/src-noconflict/theme-monokai';

// import "brace/mode/c_cpp";
import "brace/snippets/c_cpp";
// import "brace/ext/language_tools";

const ProblemEditor = ({ match }) => {
  const questionId = 1;

  
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
  const [code, setCode] = useState("");
  const [lang, setLang] = useState("C++");
  const [values, setValues] = useState(vals);

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
  // Function to handle running the code
  const handleRunCode = () => {

   };

  // Function to handle submitting the code
  const handleSubmitCode = () => { };
  function onChange(newValue) {
    const newvals = { ...values };
    newvals[questionId] = newValue;
    newvals[lang] = newValue;
    setValues(newvals);
    localStorage.setItem(questionId, JSON.stringify(newvals));
    localStorage.setItem("user-code", JSON.stringify(newvals));
  }

  return (
    <div className="container mx-auto p-4 flex">
      
      {/* Left Part */}
      <div className="w-1/2 border-r border-gray-300 p-4">
        <h1 className="text-2xl font-semibold mb-4">Problem Name</h1>
        <p>Description and other problem information go here.</p>
      </div>

      {/* Right Part */}
      <div className="w-1/2 p-4">
        {/* Language Selection */}
        <div className="mb-4 ">
        <select
          className=" bg-none b-2 m-2"
          name="languages"
          onChange={(e) => {
            setLang(e.target.value);
          }}
        >
          <option value="C++">C++</option>
          <option value="C">C</option>
          
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
            rows="6"
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
            Run
          </button>
          <button
            onClick={handleSubmitCode}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Submit
          </button>
          <p>Test Cases Passed: {testCasesPassed}</p>
        </div>
      </div>
    </div>
  );
};

export default ProblemEditor;
