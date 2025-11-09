import React from "react";
import ArticleForm from "./ArticleForm";

type Props = {
  onSubmit: (article: FormData) => void;
  onCancel: () => void;
};

const AddArticlePage: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const article = {
    title: "",
    description: "",
    image: "",
    tags: [],
    category: "",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 flex flex-col justify-center items-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg px-8 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-3">
            Add New Article
          </h1>
          <p className="text-gray-600 text-lg">
            Share your insights with the world by publishing a new article
          </p>
        </div>
        <ArticleForm initialData={article} onSubmit={onSubmit} onCancel={onCancel} />
      </div>
    </div>
  );
};

export default AddArticlePage;
