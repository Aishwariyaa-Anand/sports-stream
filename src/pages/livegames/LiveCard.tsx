import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../../config/constants';

const LiveCard = ({ match }) => {
  const [matchDetails, setMatchDetails] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/matches/${match.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch match details');
        }
        const data = await response.json();
        setMatchDetails(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching match details:', error);
      }
    };

    fetchMatchDetails();
  }, [match.id]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {matchDetails ? (
        <>
        <h2 className="font-semibold mb-2">{matchDetails.sportName}</h2>
        <p className="text-gray-500 mb-1">{matchDetails.location}</p>
        <div className="flex justify-between">
          <p className="text-gray-700">
            {matchDetails.teams[0].name}
          </p>
          <p className="text-gray-700">
            {matchDetails.score[matchDetails.teams[0].name]}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">
            {matchDetails.teams[1].name}
          </p>
          <p className="text-gray-700">
            {matchDetails.score[matchDetails.teams[1].name]}
          </p>
        </div>
      </>     
      ) : (
        <p>Loading match details...</p>
      )}
    </div>
  );
};

export default LiveCard;
