import React, { useState } from 'react';
import { connect } from "react-redux";
import {login} from  "../store/actions"
import {Requests} from "../utils/request"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic here
    // setLoading(true);
    const values = {
        username: email,
        password:password
    }
    console.log(values);
    Requests.login(values)
      .then((res) => {
        setEmail(res.data.data.email);
        localStorage.setItem("userinfo", res.data.data.token);
      
        // setLoading(false);
      })
      .catch((err) => {
        // setLoading(false);
        console.log(err.response.data.error.message);
        // toast.error(err.response.data.error.message);
      });
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};


function mapStateToProps(state) {
    return {
      isAuthenticated: state.isAuthenticated,
    };
  }
  function mapActionToProps(dispatch) {
    return {
      login: (userData) => dispatch(login(userData)),
    
    };
  }
  
export default connect(mapStateToProps, mapActionToProps)(Login);

