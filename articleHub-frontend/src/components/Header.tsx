import React, { useState } from 'react';
import { IoIosLogOut } from 'react-icons/io';
import Logout from './subcomponents/Logout';

const Header: React.FC = () => {
  const [on, setOn] = useState(false);

  const handleLogout = () => {
    setOn(true);
  };

  return (
    <>
      <header className="bg-gray-900 backdrop-blur-sm shadow-2xl h-20 flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-50 transition-all duration-300 border-b border-gray-700">
        <div className="text-xl font-bold text-white tracking-tight">
          Welcome to the <span className="text-indigo-400">Admin Panel</span>
        </div>

        <div className="flex items-center space-x-5">
          <span className="text-gray-300 text-base font-medium border-l border-gray-700 pl-5">
            Admin User
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 py-2 px-4 bg-indigo-600 text-white font-medium rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.05]"
          >
            <IoIosLogOut className="w-6 h-6" />
            <span>Logout</span>
          </button>
        </div>
      </header>
      <Logout addOn={on} setAddOn={setOn} />
    </>
  );
};

export default Header;