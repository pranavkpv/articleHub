import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <p className="text-gray-700 mb-4">Email: support@eventmanagement.com</p>
        <p className="text-gray-700 mb-4">Phone: +1 (123) 456-7890</p>
        <p className="text-gray-700">Address: 123 Event St, City, Country</p>
      </div>
    </div>
  );
};

export default Contact;