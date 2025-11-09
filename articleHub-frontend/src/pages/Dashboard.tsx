import React, { useState } from 'react';
import type { getPreferenceBaseArticleData } from '../interfaces/article';
import Footer from '../components/Footer';
import ArticleModal from '../components/ArticleModal';
import ArticleCard from '../components/ArticleCard';
import Header from '../components/Header';

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<getPreferenceBaseArticleData | null>(null);

  // Sample articles data
  const articles: getPreferenceBaseArticleData[] = [
    {
      _id: '1',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
      title: 'The Future of Web Development',
      description: 'Exploring the latest trends and technologies shaping modern web development in 2025.',
      tags: ['webdev', 'technology', 'future'],
      category: 'Technology',
      username: 'TechGuru',
      like: ['1', '2', '3'],
      dislike: ['1'],
      block: []
    },
    {
      _id: '2',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      title: 'AI and Machine Learning Basics',
      description: 'A beginner-friendly guide to understanding artificial intelligence and machine learning concepts.',
      tags: ['AI', 'ML', 'learning'],
      category: 'Education',
      username: 'AIExpert',
      like: ['1', '2'],
      dislike: [],
      block: []
    },
    {
      _id: '3',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      title: 'Building Scalable Applications',
      description: 'Best practices for creating applications that can grow with your user base.',
      tags: ['architecture', 'scalability', 'backend'],
      category: 'Development',
      username: 'DevMaster',
      like: ['1', '2', '3',' 4','5'],
      dislike: ['1', '2'],
      block: ['1']
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
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