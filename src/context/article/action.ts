import { API_ENDPOINT } from '../../config/constants';
import { ArticlesActions } from './types';

export const fetchArticles = async (dispatch: React.Dispatch<ArticlesActions>) => {
  try {
    dispatch({ type: 'FETCH_ARTICLES_REQUEST' });
    const response = await fetch(`${API_ENDPOINT}/articles`);
    const data = await response.json();
    dispatch({ type: 'FETCH_ARTICLES_SUCCESS', payload: data });
  } catch (error) {
    console.error('Error fetching articles:', error);
    dispatch({ type: 'FETCH_ARTICLES_FAILURE', payload: 'Unable to load articles' });
  }
};
