import React, { useState } from 'react';
import { connect } from "react-redux";

import {Requests } from '../utils/index';
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username ,setUsername] = useState('');
  let navigate = useNavigate();
  const handleSignup = (e) => {
    e.preventDefault();
    const values = {
        username: username,
        password:password,
        email:email
    }
    // Handle signup logic here, for example, making an API request to your backend
    // You can use Axios or any other HTTP library for this purpose
    // Example using Axios:
    Requests.register('/api/auth/signup',values)
    .then((res) => {
        console.log(res)
        navigate("/login");
        // setLoading(false);
      })
      .catch((err) => {
        // setLoading(false);
        console.log(err);
        // toast.error(err.response.data.error.message);
      });
   
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center h-screen w-full">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 text-left">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block text-sm font-medium text-gray-600 text-left">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 border rounded w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 text-left">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
          >
            SignUp
          </button>
        </form>
        <div className="m-2">
            Already have account? <Link to="/login" > Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
