import React from 'react';
import type { updateArticleData } from '../interfaces/article';
import ArticleForm from './ArticleForm';


type Props = {
  article: updateArticleData;
  onSubmit: (article: FormData) => void; 
  onCancel: () => void;
};


const EditArticlePage: React.FC<Props> = ({ article, onSubmit, onCancel }) => {
  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-md mt-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-5 text-center">Edit Article</h1>
      <ArticleForm initialData={article} onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  );
};

export default EditArticlePage;
