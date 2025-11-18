import { useState } from "react";
import type { getPreferenceBaseArticleData } from "../interfaces/article";
import { blockArticle, disLikeArticle, likeArticle } from "../api/action";

// Article Modal Component
interface ArticleModalProps {
  article: getPreferenceBaseArticleData;
  onClose: () => void;
  getPreferedArticle:()=>void
}

const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose,getPreferedArticle }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = async () => {
    const response = await likeArticle(article._id)
    if (response.success) {
      setLiked(!liked)
      setDisliked(false)
      getPreferedArticle()
      onClose()
    }
  };

  const handleDislike = async () => {
    const response = await disLikeArticle(article._id)
    if (response.success) {
      setLiked(false)
      setDisliked(!disliked)
      getPreferedArticle()
      onClose()
    }
  };

  const handleBlock = async () => {
    const response = await blockArticle(article._id)
    if (response.success) {
      setLiked(false)
      setDisliked(!disliked)
      getPreferedArticle()
      onClose()
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
        <div className="relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-72 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center text-2xl text-gray-700 hover:text-red-500 shadow-lg transition"
          >
            ×
          </button>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{article.title}</h2>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
            <span className="flex items-center gap-1">
              <span className="text-indigo-600">👤</span> {article.username}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">{article.description}</p>

          <div className="flex gap-2 flex-wrap mb-6">
            {article.tags.map(tag => (
              <span
                key={tag}
                className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold hover:from-indigo-200 hover:to-purple-200 transition"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 items-center border-t pt-6">
            <button
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${ liked
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                : 'bg-pink-100 hover:bg-pink-200 text-pink-600'
                }`}
              onClick={handleLike}
            >
              ❤️ Like {article.like.length}
            </button>
            <button
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${ disliked
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                }`}
              onClick={handleDislike}
            >
              👎 Dislike {article.dislike.length}
            </button>
            <button
              onClick={handleBlock}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 font-semibold transition-all transform hover:scale-105"
            >
              🚫 Block
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal