import React, { useState } from "react";
import Profile from "../components/Profile";
import ChangePassword from "../components/ChangePassword";
import type { ProfileData } from "../interfaces/user";

interface SettingProps {
  user: ProfileData;
  onSaveProfile: (updatedUser: ProfileData) => void;
  onChangePassword: (currentPass: string, newPass: string) => Promise<void>;
  onCancel: () => void;
}

const Setting: React.FC<SettingProps> = ({
  user,
  onSaveProfile,
  onChangePassword,
  onCancel,
}) => {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-4xl text-indigo-700 font-bold mb-6">Settings</h1>

      {/* Tab Navigation */}
      <nav className="flex border-b border-gray-300 mb-6">
        <button
          className={`px-6 py-3 font-semibold -mb-px border-b-4 transition ${
            activeTab === "profile"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-600 hover:text-indigo-600"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`px-6 py-3 font-semibold -mb-px border-b-4 transition ${
            activeTab === "password"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-600 hover:text-indigo-600"
          }`}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </button>
      </nav>

      {/* Tab Content */}
      {activeTab === "profile" && (
        <Profile user={user} onSave={onSaveProfile} onCancel={onCancel} />
      )}
      {activeTab === "password" && (
        <ChangePassword onChangePassword={onChangePassword} onCancel={onCancel} />
      )}
    </div>
  );
};

export default Setting;
