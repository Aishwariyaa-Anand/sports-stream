import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { API_ENDPOINT } from '../../config/constants';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState('');

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

    const fetchSports = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/sports`);
        if (!response.ok) {
          throw new Error('Failed to fetch sports');
        }
        const data = await response.json();
        setSports(data.sports);
      } catch (error) {
        console.error('Error fetching sports:', error);
      }
    };

    fetchArticles();
    fetchSports();
  }, []);

  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
  };

  const filteredArticles = selectedSport
    ? articles.filter(article => article.sport.name === selectedSport)
    : articles;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Trending News</h1>
      
      <div className="mb-4">
        <label htmlFor="sport-filter" className="mr-2">Filter by Sport:</label>
        <select
          id="sport-filter"
          value={selectedSport}
          onChange={handleSportChange}
          className="p-2 border rounded"
        >
          <option value="">Trending News</option>
          {sports.map(sport => (
            <option key={sport.id} value={sport.name}>
              {sport.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full max-w-full mx-auto h-96 overflow-y-auto">
        {filteredArticles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default News;
