import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';


const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/profile/dashboard' },
    { id: 'update-password', label: 'Update Password', path: '/profile/update-password' },
    { id: 'profile-update', label: 'Profile Update', path: '/profile/profile-update' },
    { id: 'your-tickets', label: 'Your Tickets', path: '/profile/your-tickets' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white fixed h-screen p-4">
        <h2 className="text-xl font-bold mb-6">Profile</h2>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  navigate(item.path);
                }}
                className={`w-full text-left py-2 px-4 rounded-md ${
                  activeTab === item.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-indigo-400'
                } transition-colors duration-300`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;