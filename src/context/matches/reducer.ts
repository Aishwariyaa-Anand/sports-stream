import { MatchesState, MatchesActions } from './types';

export const initialState: MatchesState = {
  matches: [],
  isLoading: false,
  isError: false,
  errorMessage: '',
  matchDetails: null, 
};

export const matchReducer = (state: MatchesState = initialState, action: MatchesActions): MatchesState => {
  switch (action.type) {
    case 'FETCH_MATCHES_REQUEST':
      return { ...state, isLoading: true };
    case 'FETCH_MATCHES_SUCCESS':
      return { ...state, isLoading: false, matches: action.payload };
    case 'FETCH_MATCHES_FAILURE':
      return { ...state, isLoading: false, isError: true, errorMessage: action.payload };
    case 'FETCH_MATCH_DETAILS_REQUEST':
      return { ...state, isLoading: true }; 
    case 'FETCH_MATCH_DETAILS_SUCCESS':
      return { ...state, isLoading: false, matchDetails: action.payload };
    case 'FETCH_MATCH_DETAILS_FAILURE':
      return { ...state, isLoading: false, isError: true, errorMessage: action.payload };
    default:
      return state;
  }
};
