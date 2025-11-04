import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  MdDashboard,
  MdOutlineEventAvailable,
  MdOutlinePersonAddAlt1,
  MdGroupAdd,
  // MdExitToApp,
} from 'react-icons/md';

const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: MdDashboard },
    { name: 'Manage Events', path: '/admin/add-event', icon: MdOutlineEventAvailable },
    { name: 'Manage Volunteers', path: '/admin/add-volunteer', icon: MdOutlinePersonAddAlt1 },
    { name: 'Assign Teams', path: '/admin/assign-volunteers', icon: MdGroupAdd },
  ];

  // const bottomItem = { name: 'Logout', path: '/logout', icon: MdExitToApp };

  return (
    <div className="w-64 bg-gray-900 text-gray-200 h-screen fixed top-0 left-0 flex flex-col shadow-2xl transition-all duration-300">

      <div className="p-2 text-2xl font-extrabold text-white text-center border-b border-gray-700/50 bg-gray-800">
        <span className="text-indigo-400">Event</span>Flow Admin 🚀
      </div>


      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-xl transition duration-300 ease-in-out font-medium tracking-wide
                  ${ isActive
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white transform hover:scale-[1.02]'
                  }`
                }
                end
              >

                <item.icon className="w-6 h-6 mr-3 text-indigo-300" />

                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>


      {/* <div className="p-4 border-t border-gray-700/50">
        <NavLink
          to={bottomItem.path}
          className="flex items-center p-3 rounded-xl transition duration-300 ease-in-out font-medium text-red-400 hover:bg-gray-700 hover:text-red-300"
        >
          <bottomItem.icon className="w-6 h-6 mr-3" />
          {bottomItem.name}
        </NavLink>
      </div> */}
    </div>
  );
};

export default Sidebar;