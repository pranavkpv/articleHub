import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Header Component
const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate()

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-3xl">📰</span>
              ArticleHub
            </h1>
          </div>
          
          <nav className="flex gap-6">
            <button
              onClick={() => {
                navigate('/dashboard')
                setActiveTab('home')
              }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === 'home'
                  ? 'bg-white text-indigo-600 shadow-md'
                  : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
            >
              🏠 Home
            </button>
            <button
              onClick={() => {
                navigate('/article')
                setActiveTab('your-articles')
              }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === 'your-articles'
                  ? 'bg-white text-indigo-600 shadow-md'
                  : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
            >
              📝 Your Articles
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header

