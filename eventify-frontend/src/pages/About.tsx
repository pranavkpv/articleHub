import React from 'react';

const About: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">About Us</h2>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <p className="text-gray-700">
          Event Management is your go-to platform for discovering and managing exciting events. Join us to explore a world of experiences!
        </p>
      </div>
    </div>
  );
};

export default About;