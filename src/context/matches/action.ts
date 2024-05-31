import { API_ENDPOINT } from '../../config/constants';
import { MatchesActions } from './types';

export const fetchMatches = async (dispatch: React.Dispatch<MatchesActions>) => {
  try {
    dispatch({ type: 'FETCH_MATCHES_REQUEST' });
    const response = await fetch(`${API_ENDPOINT}/matches`);
    const data = await response.json();
    dispatch({ type: 'FETCH_MATCHES_SUCCESS', payload: data.matches.filter(match => match.isRunning) });
  } catch (error) {
    console.error('Error fetching matches:', error);
    dispatch({ type: 'FETCH_MATCHES_FAILURE', payload: 'Unable to load matches' });
  }
};

export const fetchMatchDetails = async (dispatch: React.Dispatch<MatchesActions>, matchId: number) => {
    try {
      dispatch({ type: 'FETCH_MATCH_DETAILS_REQUEST' });
      const response = await fetch(`${API_ENDPOINT}/matches/${matchId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch match details');
      }
      const data = await response.json();
      console.log(data);
      dispatch({ type: 'FETCH_MATCH_DETAILS_SUCCESS', payload: data });
    } catch (error) {
      console.error('Error fetching match details:', error);
      dispatch({ type: 'FETCH_MATCH_DETAILS_FAILURE', payload: 'Unable to load match details' });
    }
  };