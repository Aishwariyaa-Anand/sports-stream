import React, { useEffect, useState } from 'react';
import LiveCard from './LiveCard';
import { API_ENDPOINT } from '../../config/constants';

const LiveGames = () => {
  const [matches, setMatches] = useState([]);

  // Fetch ongoing matches from the API
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/matches`);
        if (!response.ok) {
          throw new Error('Failed to fetch matches');
        }
        const data = await response.json();
        setMatches(data.matches.filter(match => match.isRunning));
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Live Games</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {matches.map(match => (
          <LiveCard match={match} />
        ))}
      </div>
    </div>
  );
};

export default LiveGames;
