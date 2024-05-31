export interface Article {
    id: number;
    title: string;
    summary: string;
    date: string;
    sport: { id: number; name: string };
    teams: { id: number; name: string }[];
    thumbnail: string;
  }
  
  export interface ArticlesState {
    articles: Article[];
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
  }
  
  export type ArticlesActions = 
    | { type: 'FETCH_ARTICLES_REQUEST' }
    | { type: 'FETCH_ARTICLES_SUCCESS'; payload: Article[] }
    | { type: 'FETCH_ARTICLES_FAILURE'; payload: string };
  