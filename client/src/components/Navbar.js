import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  console.log("isauthenticated ", props.isAuthenticated)
  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-semibold">BeatCode</div>
      <div className="space-x-4">
        <button className="text-white hover:text-gray-300 focus:outline-none">
          <Link  to="/ProblemList">
          Problems
          </Link>
        </button>
        {props.isAuthenticated ? (
          <button className="text-white hover:text-gray-300 focus:outline-none">
            Profile
          </button>
        ) : (
          <>
            <button className="text-white hover:text-gray-300 focus:outline-none">
              <Link to="/login" >  Login </Link>
            </button>
           
          </>
        )}
      </div>
    </nav>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated,
  };
}
function mapActionToProps(dispatch) {
  return {
   
  
  };
}

export default connect(mapStateToProps, mapActionToProps)(Navbar);

