// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">📰</span>
              ArticleHub
            </h3>
            <p className="text-gray-400 text-sm">
              Discover and share amazing articles tailored to your interests.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-gray-700 hover:bg-indigo-600 transition p-2 rounded-full">
                <span className="text-xl">📘</span>
              </a>
              <a href="#" className="bg-gray-700 hover:bg-indigo-600 transition p-2 rounded-full">
                <span className="text-xl">🐦</span>
              </a>
              <a href="#" className="bg-gray-700 hover:bg-indigo-600 transition p-2 rounded-full">
                <span className="text-xl">📷</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} ArticleHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer