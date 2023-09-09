const Problem = require('../models/Problem.model');

// Create a new problem
const createProblem = async (req, res) => {
  console.log("In controller")
  console.log("req user ",req.user)
  try {
    const {
      title,
      description,
      inputFormat,
      outputFormat,
      difficultyLevel,
      tags,
      timeLimitInSeconds,
      memoryLimitInMB,
      testCases,
    } = req.body;
    const creator = req.user.id; // Assuming you have user authentication middleware
   
    const newProblem = new Problem({
      title,
      description,
      inputFormat,
      outputFormat,
      difficultyLevel,
      tags,
      timeLimitInSeconds,
      memoryLimitInMB,
      testCases,
      creator
    });

    await newProblem.save();

    res.status(201).json(newProblem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// update problem 
const updateProblemById = async (req, res) => {
  try {
    const problemId = req.params.id;
    const {
      title,
      description,
      inputFormat,
      outputFormat,
      difficultyLevel,
      tags,
      timeLimitInSeconds,
      memoryLimitInMB,
      testCases,
    } = req.body;
 
    const creator = req.user.id;

    const updatedProblem = await Problem.findByIdAndUpdate(
      problemId,
      {
        title,
        description,
        inputFormat,
        outputFormat,
        difficultyLevel,
        tags,
        timeLimitInSeconds,
        memoryLimitInMB,
        testCases,
        creator
      },
      { new: true } // Return the updated document
    );

    if (!updatedProblem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.status(200).json(updatedProblem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get a list of all problems
const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json(problems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single problem by ID
const getProblemById = async (req, res) => {
  try {
    const problemId = req.params.id;
    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.status(200).json(problem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Other problem-related controller functions can be added here
module.exports = {createProblem,updateProblemById,getAllProblems,getProblemById }
