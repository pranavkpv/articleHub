import type { getPreferenceBaseArticleData } from "../interfaces/article";

// Article Card Component
interface ArticleCardProps {
  article: getPreferenceBaseArticleData;
  onClick: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => (
  <div
    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl max-w-sm w-full cursor-pointer transform hover:scale-105 transition-all duration-300"
    onClick={onClick}
  >
    <div className="relative">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <div className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
        {article.category}
      </div>
    </div>
    <div className="p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-500 text-sm flex items-center gap-1">
          <span className="text-indigo-600">👤</span> {article.username}
        </span>
      </div>
      <h2 className="font-bold text-xl mb-2 text-gray-800 line-clamp-2 hover:text-indigo-600 transition">
        {article.title}
      </h2>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.description}</p>
      <div className="flex gap-5 text-sm">
        <span className="flex items-center gap-1 text-pink-500 font-semibold">
          ❤️ {article.like.length}
        </span>
        <span className="flex items-center gap-1 text-yellow-600 font-semibold">
          👎 {article.dislike.length}
        </span>
        <span className="flex items-center gap-1 text-red-500 font-semibold">
          🚫 {article.block.length}
        </span>
      </div>
    </div>
  </div>
);

export default ArticleCard

