import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { API_ENDPOINT } from '../../config/constants';
import { useAuth } from '../../context/AuthContext';

const News = () => {
  const { user, preferences } = useAuth();
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

  const getFilteredArticles = () => {
    let filtered = articles;
    if (user && preferences) {
      filtered = filtered.filter(article =>
        (article.sport && preferences.preferences.sports.includes(article.sport.id)) ||
        (article.teams && article.teams.some(team => preferences.preferences.teams.includes(team.id)))
      );
    }
    if (selectedSport) {
      filtered = filtered.filter(article => article.sport && article.sport.name === selectedSport);
    }
    if (selectedTeam) {
      filtered = filtered.filter(article => article.teams && article.teams.some(team => team.name === selectedTeam));
    }
    return filtered;
  };


  const displayedSports = user && preferences && preferences.preferences && preferences.preferences.sports ? sports.filter(sport => preferences.preferences.sports.includes(sport.id)) : sports;
  const displayedTeams = selectedSport
    ? (user && preferences && preferences.preferences && preferences.preferences.teams) 
      ? teams.filter(team => preferences.preferences.teams.includes(team.id) && team.plays === selectedSport) 
      : teams.filter(team => team.plays === selectedSport)
    : user && preferences && preferences.preferences && preferences.preferences.teams
    ? teams.filter(team => preferences.preferences.teams.includes(team.id))
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
          {displayedSports.map(sport => (
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
            {displayedTeams.map(team => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full max-w-full mx-auto h-96 overflow-y-auto">
        {getFilteredArticles().length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredArticles().map(article => (
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
