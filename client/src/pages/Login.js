import React, { useState } from 'react';
import { connect } from "react-redux";
import {login} from  "../store/actions"
import {Requests } from '../utils/index';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic here
    // setLoading(true);
    const values = {
        username: username,
        password:password
    }
    console.log(values);
    Requests.login(values)
      .then((res) => {
        console.log(res)
        localStorage.setItem("userinfo",res.data.token);
        console.log("token after sotring ",localStorage.getItem('userinfo'))
        props.login(res)
        navigate("/");
        // setLoading(false);
      })
      .catch((err) => {
        // setLoading(false);
        console.log(err);
        // toast.error(err.response.data.error.message);
      });
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen w-full">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 text-left">
              Email
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
            Login
          </button>
          <div className="m-2">
            Don't have account , <Link to="/signup"> Create one </Link>
          </div>
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

