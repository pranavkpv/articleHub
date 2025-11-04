import React from 'react';
import { FaCalendarAlt, FaUsers, FaTasks } from 'react-icons/fa'; // Icons for the links and stats
import { Link } from 'react-router-dom';

// Assume this is the main dashboard component for the admin panel
const Dashboard: React.FC = () => {

  // --- Mock Data for Dashboard Statistics ---
  // const stats = [
  //   {
  //     id: 1,
  //     name: "Total Events",
  //     value: 42,
  //     icon: FaCalendarAlt,
  //     color: "text-indigo-400",
  //     bgColor: "bg-indigo-900/40"
  //   },
  //   {
  //     id: 2,
  //     name: "Active Volunteers",
  //     value: 158,
  //     icon: FaUsers,
  //     color: "text-green-400",
  //     bgColor: "bg-green-900/40"
  //   },
  //   {
  //     id: 3,
  //     name: "Pending Assignments",
  //     value: 12,
  //     icon: FaTasks,
  //     color: "text-yellow-400",
  //     bgColor: "bg-yellow-900/40"
  //   },
  //   {
  //     id: 4,
  //     name: "Tickets Sold",
  //     value: 1890,
  //     icon: FaTicketAlt,
  //     color: "text-red-400",
  //     bgColor: "bg-red-900/40"
  //   },
  // ];

  // --- Quick Link Data ---
  const quickLinks = [
    {
      id: 'manage-event',
      name: 'Manage Events',
      description: 'Create, edit, or delete events.',
      icon: FaCalendarAlt,
      href: '/admin/add-event'
    },
    {
      id: 'manage-volunteer',
      name: 'Manage Volunteers',
      description: 'Add and review volunteer details.',
      icon: FaUsers,
      href: '/admin/add-volunteer'
    },
    {
      id: 'assign-event',
      name: 'Assign Volunteers',
      description: 'Allocate volunteers to active events.',
      icon: FaTasks,
      href: '/admin/assign-volunteers'
    },
  ];

  return (
    <div className="p-6 bg-gray-800 min-h-screen">

      <h2 className="text-3xl font-extrabold text-indigo-400 border-b-2 border-indigo-400 pb-2 mb-8">
        Admin Dashboard Overview
      </h2>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`p-5 rounded-xl shadow-xl transition duration-300 hover:scale-[1.02] border border-gray-700 ${ stat.bgColor }`}
          >
            <div className="flex items-center">
              <stat.icon className={`w-8 h-8 ${ stat.color } mr-4`} />
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      <div className="bg-gray-900 p-6 rounded-xl shadow-2xl">
        <h3 className="text-2xl font-bold text-gray-200 mb-6 border-b border-gray-700 pb-3">Quick Actions</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map((link) => (
            <Link
              key={link.id}
              to={link.href}
              className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700/70 transition duration-200 border border-indigo-600/50"
            >
              <link.icon className="w-8 h-8 text-indigo-400 mb-3" />
              <p className="text-xl font-semibold text-white mb-1">{link.name}</p>
              <p className="text-sm text-gray-400 text-center">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;