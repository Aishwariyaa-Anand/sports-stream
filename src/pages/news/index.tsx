import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { API_ENDPOINT } from '../../config/constants';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [sports, setSports] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

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

    const fetchTeams = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/teams`);
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchArticles();
    fetchSports();
    fetchTeams();
  }, []);

  const handleSportChange = (sport) => {
    setSelectedSport(sport);
    setSelectedTeam('');
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const filteredArticles = selectedTeam
    ? articles.filter(article => article.teams && article.teams.some(team => team.name === selectedTeam))
    : selectedSport
      ? articles.filter(article => article.sport && article.sport.name === selectedSport)
      : articles;

  const filteredTeams = selectedSport
    ? teams.filter(team => team.plays === selectedSport)
    : teams;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Trending News</h1>
      
      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-4 overflow-x-auto">
          <button
            onClick={() => handleSportChange('')}
            className={`p-2 ${selectedSport === '' ? 'border-b-2 border-blue-500' : ''}`}
          >
            All
          </button>
          {sports.map(sport => (
            <button
              key={sport.id}
              onClick={() => handleSportChange(sport.name)}
              className={`p-2 ${selectedSport === sport.name ? 'border-b-2 border-blue-500' : ''}`}
            >
              {sport.name}
            </button>
          ))}
        </div>

        <div className="ml-4">
          <label htmlFor="team-filter" className="mr-2">Filter by Team:</label>
          <select
            id="team-filter"
            value={selectedTeam}
            onChange={handleTeamChange}
            className="p-2 border rounded"
          >
            <option value="">All Teams</option>
            {filteredTeams.map(team => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full max-w-full mx-auto h-96 overflow-y-auto">
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No articles available for the selected filter.</p>
        )}
      </div>
    </div>
  );
};

export default News;
