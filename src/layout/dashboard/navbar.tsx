// src/components/Layouts/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import userImage from '../../assets/images/user.png'; // replace with actual user image path

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/signin');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="flex-1 text-center">
        <Link to="/" className="font-bold text-xl">SportsStream</Link>
      </div>
      <div className="flex items-center">
        {user ? (
          <div className="relative group">
            <img
              src={userImage}
              alt="User"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-200"
              >
                Logout
              </button>
              <button
                onClick={() => navigate('/changepassword')}
                className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-200"
              >
                Change Password
              </button>
            </div>
          </div>
        ) : (
          <Link to="/signin" className="mr-4">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;