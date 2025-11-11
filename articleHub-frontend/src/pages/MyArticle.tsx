import Header from "../components/Header";
import MyArticleCard from "../components/MyArticleCard";
import type { getUserBaseArticleData } from "../interfaces/article";

// ==================== MyArticlesListPage Component ====================
interface MyArticlesListPageProps {
  articles: getUserBaseArticleData[];
  onEdit: (article: getUserBaseArticleData) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const MyArticlesListPage: React.FC<MyArticlesListPageProps> = ({
  articles,
  onEdit,
  onDelete,
  onAdd
}) => {
  return (
    <>
      <Header page='your-articles' />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
                  Your Articles
                </h1>
                <p className="text-gray-600 text-lg">
                  Manage and organize your published content
                </p>
              </div>
              <button
                onClick={onAdd}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                <span className="text-xl">+</span>
                Create New Article
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Articles</p>
                    <p className="text-2xl font-bold text-gray-800">{articles.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Likes</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {articles.reduce((sum, a) => sum + a.like.length, 0)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <span className="text-2xl">👁️</span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Engagement</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {articles.reduce((sum, a) => sum + a.like.length + a.dislike.length, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">📝</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">No articles yet</h3>
              <p className="text-gray-500 mb-8">Start creating your first article to share your thoughts with the world!</p>
              <button
                onClick={onAdd}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Create Your First Article
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <MyArticleCard
                  key={article._id}
                  article={article}
                  showActions
                  onEdit={() => onEdit(article)}
                  onDelete={() => onDelete(article._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyArticlesListPage