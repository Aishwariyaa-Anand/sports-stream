import React, { useState, useEffect } from 'react';
import FullArticle from './FullArticle';

const ArticleCard = ({ article }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div key={article.id} className="p-4 rounded-lg shadow-md bg-white mb-4 flex justify-between items-center">
      <div>
        <h2 className="font-semibold mb-2">{article.title}</h2>
        <p className="text-gray-500 mb-1">{new Date(article.date).toLocaleDateString()} - {article.sport.name}</p>
        <p className="text-gray-500 mb-1">{article.summary}</p>
        <button
          className="mt-4 text-blue-500 hover:underline"
          onClick={() => setIsModalOpen(true)}
        >
          Read More
        </button>

        {isModalOpen && (
          <FullArticle
            articleId={article.id}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div><div>
        <img 
          src={article.thumbnail} 
          alt={article.title} 
          className="w-32 h-20 object-cover rounded-md"
        />
      </div>
    </div>
  );
};

export default ArticleCard;
