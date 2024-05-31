import React, { createContext, useReducer, useContext } from 'react';
import { matchReducer, initialState } from './reducer';
import { MatchesState, MatchesActions } from './types';

const MatchestateContext = createContext<MatchesState | undefined>(undefined);
const MatchDispatchContext = createContext<React.Dispatch<MatchesActions> | undefined>(undefined);

export const MatchesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(matchReducer, initialState);

  return (
    <MatchestateContext.Provider value={state}>
      <MatchDispatchContext.Provider value={dispatch}>
        {children}
      </MatchDispatchContext.Provider>
    </MatchestateContext.Provider>
  );
};

export const useMatchesState = () => useContext(MatchestateContext);

export const useMatchesDispatch = () => useContext(MatchDispatchContext);
