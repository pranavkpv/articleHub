import React, { useEffect, useState } from 'react';
import type { getUserBaseArticleData } from '../interfaces/article';
import MyArticlesListPage from './MyArticle';
import AddArticlePage from '../components/AddArticle';
import EditArticlePage from '../components/EditArticle';
import { toast } from 'react-toastify';
import { addArticle, deleteArticle, getUserArticle, updateArticle } from '../api/article';

type View = 'list' | 'add' | 'edit';

const ArticlesContainer: React.FC = () => {
   const [articles, setArticles] = useState<getUserBaseArticleData[]>([]);
   const [currentView, setCurrentView] = useState<View>('list');
   const [editArticle, setEditArticle] = useState<getUserBaseArticleData | null>(null);

   const navigateToList = () => setCurrentView('list');

   const handleAdd = () => setCurrentView('add');

   const handleEdit = (article: getUserBaseArticleData) => {
      setEditArticle(article);
      setCurrentView('edit');
   };

   const handleGetArticle = async () => {
      const response = await getUserArticle()
      if (response.success) {
         setArticles(response.data)
      }
   }

   const handleDelete = async (id: string) => {
      if (confirm('Are you sure you want to delete?')) {
         const response = await deleteArticle(id)
         if (response.success) {
            toast.success(response.message)
         }
      }
   };

   const handleCreateSubmit = async (formData: FormData) => { // ✅ changed
      const response = await addArticle(formData);
      if (response.success) toast.success(response.message);
   };

   const handleUpdateSubmit = async (formData: FormData) => { 
      const response = await updateArticle(formData);
      if (response.success) toast.success(response.message);
   };


   useEffect(() => {
      handleGetArticle()
   }, [])

   return (
      <>
         {currentView === 'list' && (
            <MyArticlesListPage
               articles={articles}
               onAdd={handleAdd}
               onEdit={handleEdit}
               onDelete={handleDelete}
            />
         )}
         {currentView === 'add' && (
            <AddArticlePage onSubmit={handleCreateSubmit} onCancel={navigateToList} />
         )}
         {currentView === 'edit' && editArticle && (
            <EditArticlePage
               article={editArticle}
               onSubmit={handleUpdateSubmit}
               onCancel={() => {
                  setEditArticle(null);
                  navigateToList();
               }}
            />
         )}
      </>
   );
};

export default ArticlesContainer;
