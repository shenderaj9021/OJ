import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Requests } from '../utils';

const problems = [
  { id: 1, name: 'Problem 1', difficulty: 'Easy' },
  { id: 2, name: 'Problem 2', difficulty: 'Medium' },
  // Add more problems as needed
];

const ProblemList = () => {

  const [problems, setProblems] = useState([]);

  useEffect(() => {
    // Fetch problems from the backend API endpoint
    Requests.getAllProblems()
      .then((response) => {
        setProblems(response.data); 
        console.log(problems)// Update the state with fetched problems
      })
      .catch((error) => {
        console.error('Error fetching problems:', error);
      });
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">List of Problems</h1>
      <div className="flex flex-col">
        {problems.map((problem) => (
          
          <div
            key={problem._id}
            className="bg-white p-4 rounded shadow-md mb-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold mb-2">{problem.title}</h2>
              <p className="text-gray-600">Difficulty: {problem.difficultyLevel}</p>
              <div className="flex flex-wrap">
                {problem.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 m-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to={`/problem/${problem._id}`}
              className="bg-blue-500 text-white px-12 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Solve
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemList;
