import React from 'react';

const UserDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Dashboard</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700 mb-4">Welcome to your dashboard!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-indigo-100 p-4 rounded-md">
            <p className="text-lg font-semibold text-indigo-600">Tickets Purchased</p>
            <p className="text-2xl font-bold text-gray-800">5</p>
          </div>
          <div className="bg-indigo-100 p-4 rounded-md">
            <p className="text-lg font-semibold text-indigo-600">Upcoming Events</p>
            <p className="text-2xl font-bold text-gray-800">3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;