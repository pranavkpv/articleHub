import type { getUserBaseArticleData } from "../interfaces/article";

interface MyArticleCardProps {
  article: getUserBaseArticleData;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const MyArticleCard: React.FC<MyArticleCardProps> = ({ 
  article, 
  showActions = false, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden h-48">
        <img
          src={article.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop'}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* <div className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {article.category}
        </div> */}
      </div>
      
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {article.title}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {article.description}
        </p>
        
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag:string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-100">
          <div className="flex gap-4 text-gray-500">
            <span className="flex items-center gap-1">
              <span className="text-pink-500">❤️</span> {article.like.length}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-yellow-600">👎</span> {article.dislike.length}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-red-500">🚫</span> {article.block.length}
            </span>
          </div>
        </div>
        
        {showActions && (
          <div className="flex gap-3 pt-3">
            <button
              onClick={onEdit}
              className="flex-1 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
            >
              ✏️ Edit
            </button>
            <button
              onClick={onDelete}
              className="flex-1 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-rose-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default MyArticleCard