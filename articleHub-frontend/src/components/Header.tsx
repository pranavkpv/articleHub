import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutApi } from "../api/userAuth";

interface Prop {
  page: string;
}

const Header = ({ page }: Prop) => {
  const [activeTab, setActiveTab] = useState(page);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await LogoutApi()
      if (response.success) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-3xl">📰</span>
                ArticleHub
              </h1>
            </div>

            {/* Navigation */}
            <nav className="flex gap-6">
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setActiveTab("home");
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${ activeTab === "home"
                    ? "bg-white text-indigo-600 shadow-md"
                    : "text-white hover:bg-white hover:bg-opacity-20"
                  }`}
              >
                🏠 Home
              </button>

              <button
                onClick={() => {
                  navigate("/article");
                  setActiveTab("your-articles");
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${ activeTab === "your-articles"
                    ? "bg-white text-indigo-600 shadow-md"
                    : "text-white hover:bg-white hover:bg-opacity-20"
                  }`}
              >
                📝 Your Articles
              </button>

              <button
                onClick={() => {
                  navigate("/setting");
                  setActiveTab("setting");
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1 ${ activeTab === "setting"
                    ? "bg-white text-indigo-600 shadow-md"
                    : "text-white hover:bg-white hover:bg-opacity-20"
                  }`}
              >
                ⚙️ Settings
              </button>

              {/* 🔒 Logout Button */}
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1 text-white hover:bg-red-500 hover:bg-opacity-80"
              >
                🚪 Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* 🔔 Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out of your account?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
