import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import Logout from '../subcomponents/Logout';

const UserHeader: React.FC = () => {
  const navigate = useNavigate();
  const [on,setOn] = useState(false)

  const handleLogout = () => {
    setOn(true)
  };

  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 shadow-lg h-20 flex items-center fixed w-full z-10 border-b border-gray-700">
      <div className="max-w-7xl px-4 mx-auto flex items-center justify-between w-full">
        <div className="text-2xl font-extrabold text-white tracking-tight">
          <span className="text-indigo-400">Event</span> Management
        </div>
        <nav className="flex items-center gap-x-2 sm:gap-x-6">
          <button
            onClick={() => navigate('/user/home')}
            className="text-gray-300 hover:text-indigo-400 transition-colors text-sm sm:text-base"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/user/userEvent')}
            className="text-gray-300 hover:text-indigo-400 transition-colors text-sm sm:text-base"
          >
            Your Events
          </button>
          {/* <button
            onClick={() => navigate('/user/about')}
            className="text-gray-300 hover:text-indigo-400 transition-colors text-sm sm:text-base"
          >
            About
          </button>
          <button
            onClick={() => navigate('/user/profile/dashboard')}
            className="text-gray-300 hover:text-indigo-400 transition-colors text-sm sm:text-base"
          >
            Profile
          </button> */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 py-2 px-3 sm:px-4 bg-indigo-600 text-white font-medium rounded-full shadow-md hover:bg-indigo-500 transition duration-300 text-sm sm:text-base"
          >
            <IoIosLogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
      <Logout addOn={on} setAddOn={setOn} />
    </header>
  );
};

export default UserHeader;