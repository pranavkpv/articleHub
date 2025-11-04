import React, { useState } from "react";

const VolunteerProfileUpdate: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  return (
    <div className="p-6 max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
      <form className="space-y-4">
        <input
          className="w-full border rounded-lg p-2"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full border rounded-lg p-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full border rounded-lg p-2"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default VolunteerProfileUpdate;
