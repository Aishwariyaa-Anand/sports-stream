import React, { createContext, useReducer, useContext } from 'react';
import { articleReducer, initialState } from './reducer';
import { ArticlesState, ArticlesActions } from './types';

const ArticleStateContext = createContext<ArticlesState | undefined>(undefined);
const ArticleDispatchContext = createContext<React.Dispatch<ArticlesActions> | undefined>(undefined);

export const ArticleProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(articleReducer, initialState);

  return (
    <ArticleStateContext.Provider value={state}>
      <ArticleDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleDispatchContext.Provider>
    </ArticleStateContext.Provider>
  );
};

export const useArticlesState = () => useContext(ArticleStateContext);

export const useArticlesDispatch = () => useContext(ArticleDispatchContext);
