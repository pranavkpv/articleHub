import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 text-white py-6 mt-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm">&copy; 2025 Event Management. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;