import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { API_ENDPOINT } from '../../config/constants';

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/articles`);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Trending News</h1>
      <div className=" w-full max-w-full mx-auto h-96 overflow-y-auto">
        {articles.map(article => (
          <ArticleCard article={article} />
        ))}
      </div>
    </div>
  );
};

export default News;
