import React, { useState } from "react";

const VolunteerChangePassword: React.FC = () => {
  const [passwords, setPasswords] = useState({ old: "", newPass: "", confirm: "" });

  return (
    <div className="p-6 max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form className="space-y-4">
        <input
          type="password"
          className="w-full border rounded-lg p-2"
          placeholder="Old Password"
          onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
        />
        <input
          type="password"
          className="w-full border rounded-lg p-2"
          placeholder="New Password"
          onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
        />
        <input
          type="password"
          className="w-full border rounded-lg p-2"
          placeholder="Confirm Password"
          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default VolunteerChangePassword;
