import React from 'react';

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-semibold">Your Platform Name</div>
      <div className="space-x-4">
        <button className="text-white hover:text-gray-300 focus:outline-none">
          Problems
        </button>
        {isLoggedIn ? (
          <button className="text-white hover:text-gray-300 focus:outline-none">
            Profile
          </button>
        ) : (
          <>
            <button className="text-white hover:text-gray-300 focus:outline-none">
              Login
            </button>
           
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
