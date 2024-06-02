import React, { useEffect } from 'react';
const LiveCard = React.lazy(() => import('./LiveCard'));
import { useMatchesState, useMatchesDispatch } from '../../context/matches/context';
import { fetchMatches } from '../../context/matches/action';
import { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";

const LiveGames = () => {
  const { matches, isLoading, isError, errorMessage } = useMatchesState();
  const dispatch = useMatchesDispatch();

  useEffect(() => {
    fetchMatches(dispatch);
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {errorMessage}</p>;

  return (
    <>
    <div>
      <h1 className="text-2xl font-bold mb-4">Live Games</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {matches.map(match => (
          <ErrorBoundary>
          <Suspense fallback={<div>Loading Live Games...</div>}>
            <LiveCard key={match.id} match={match} />
          </Suspense>
          </ErrorBoundary>
        ))}
      </div>
    </div>
    </>
  );
};

export default LiveGames;
