export interface MatchDetails {
    id: number;
    sportName: string;
    location: string;
    teams: { id: number; name: string }[];
    score: { [teamName: string]: number };
  }
  
  export interface MatchesState {
    matches: MatchDetails[];
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    matchDetails: MatchDetails;
  }
  
  export type MatchesActions = 
    | { type: 'FETCH_MATCHES_REQUEST' }
    | { type: 'FETCH_MATCHES_SUCCESS'; payload: MatchDetails[] }
    | { type: 'FETCH_MATCHES_FAILURE'; payload: string }
    | { type: 'FETCH_MATCH_DETAILS_REQUEST' }
    | { type: 'FETCH_MATCH_DETAILS_SUCCESS'; payload: MatchDetails }
    | { type: 'FETCH_MATCH_DETAILS_FAILURE'; payload: string };