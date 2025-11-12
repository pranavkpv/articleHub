import React, { useEffect, useState } from "react";
import { listCategoryApi } from "../api/category";
import { toast } from "react-toastify";
import type { categoryData } from "../interfaces/category";

export interface IUserModelEntity {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  DOB: Date;
  image: string;
  preferences: string[];
}

interface ProfileProps {
  user: IUserModelEntity;
  onSave: (updatedUser: IUserModelEntity) => void;
  onCancel: () => void;
}


const Profile: React.FC<ProfileProps> = ({ user, onSave, onCancel }) => {
  const [form, setForm] = useState<IUserModelEntity>({ ...user });
  const [error, setError] = useState<string | null>(null);
  const [availablePreferences, setAvailablePreferences] = useState<categoryData[]>([])

  const fetchCategory = async () => {
    const categoryData = await listCategoryApi();
    if (categoryData.success) {
      setAvailablePreferences(categoryData.data);
    } else {
      toast.error(categoryData.message);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferencesChange = (pref: string) => {
    setForm((prev) => {
      const prefs = prev.preferences.includes(pref)
        ? prev.preferences.filter((p) => p !== pref)
        : [...prev.preferences, pref];
      return { ...prev, preferences: prefs };
    });
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setForm((prev) => ({ ...prev, image: reader.result as string }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    onSave(form);
    console.log(error)
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* ...existing Profile form code as before, unchanged... */}

      {/* Image */}
      {/* <div className="flex items-center gap-6">
        <img
          src={form.image || "https://via.placeholder.com/80"}
          alt="User avatar"
          className="rounded-full w-20 h-20 object-cover border-2 border-indigo-600"
        />
        <label className="cursor-pointer text-indigo-600 hover:text-indigo-800 font-medium">
          Change Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {error}
        </label>
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="firstname"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            value={form.firstname}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="lastname"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            value={form.lastname}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      {/* Email and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Date of Birth */}
      <div>
        <label
          htmlFor="DOB"
          className="block text-sm font-medium text-gray-700"
        >
          Date of Birth
        </label>
        <input
          id="DOB"
          name="DOB"
          type="date"
          value={form.DOB.toString().split('T')[0]}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, DOB: new Date(e.target.value) }))
          }
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <fieldset>
        <legend className="text-lg font-medium text-gray-900 mb-2">
          Article Preferences
        </legend>
        <div className="flex flex-wrap gap-4">
          {availablePreferences.map((pref) => (
            <label
              key={pref._id}
              className={`border rounded-full px-4 py-2 cursor-pointer select-none transition-all duration-200 ${ form.preferences.includes(pref._id)
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-indigo-100"
                }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={form.preferences.includes(pref._id)}
                onChange={() => handlePreferencesChange(pref._id)}
              />
              {pref.name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default Profile;
