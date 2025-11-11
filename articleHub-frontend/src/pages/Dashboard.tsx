import React, { useEffect, useState } from 'react';
import type { getPreferenceBaseArticleData } from '../interfaces/article';
import Footer from '../components/Footer';
import ArticleModal from '../components/ArticleModal';
import ArticleCard from '../components/ArticleCard';
import Header from '../components/Header';
import { fetchPreferenceBaseArticleApi } from '../api/article';

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<getPreferenceBaseArticleData | null>(null);
  const [articles,setArticles] = useState<getPreferenceBaseArticleData[]>([])

  const getPreferedArticle = async()=>{
    const response = await fetchPreferenceBaseArticleApi()
    console.log(response)
    if(response.success){
      setArticles(response.data)
    }
  }

  useEffect(()=>{
    getPreferedArticle()
  },[])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header page='home' />
      
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
              Your Article Feed
            </h1>
            <p className="text-gray-600 text-lg">
              Discover amazing content curated just for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <ArticleCard
                key={article._id}
                article={article}
                onClick={() => setSelectedArticle(article)}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
      
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;