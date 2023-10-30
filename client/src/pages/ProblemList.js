import React from 'react';
import { Link } from 'react-router-dom';

const problems = [
  { id: 1, name: 'Problem 1', difficulty: 'Easy' },
  { id: 2, name: 'Problem 2', difficulty: 'Medium' },
  // Add more problems as needed
];

const ProblemList = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">List of Problems</h1>
      <div className="flex flex-col">
        {problems.map((problem) => (
          <div
            key={problem.id}
            className="bg-white p-4 rounded shadow-md mb-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold mb-2">{problem.name}</h2>
              <p className="text-gray-600">Difficulty: {problem.difficulty}</p>
            </div>
            <Link
              to={`/problem/${problem.id}`}
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
