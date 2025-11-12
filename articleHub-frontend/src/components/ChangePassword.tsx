import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface ChangePasswordProps {
  onChangePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  onCancel: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
  onChangePassword,
  onCancel,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Visibility states
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await onChangePassword(currentPassword, newPassword);
    } catch (err: any) {
      setError(err.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto space-y-6"
    >
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
        Change Password
      </h2>

      {/* Current Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Current Password
        </label>
        <div className="relative">
          <input
            placeholder="password"
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border rounded-md p-2 pr-10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* New Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <div className="relative">
          <input
            placeholder="new password"
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded-md p-2 pr-10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            placeholder="confirm password"
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-md p-2 pr-10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-600 text-center font-semibold">{error}</p>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md transition"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
