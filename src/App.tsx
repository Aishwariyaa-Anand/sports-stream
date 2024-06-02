 
import { RouterProvider } from "react-router-dom";
import './App.css'
import router from "./routes"
import { AuthProvider } from './context/AuthContext';
import { ArticleProvider } from './context/article/context';
import React, { Suspense } from "react";
import { MatchesProvider } from "./context/matches/context";

function App() {
  return (
    <div>
      <React.StrictMode>
        <MatchesProvider>
        <ArticleProvider>
        <AuthProvider>
          <Suspense fallback={<>Loading...</>}>
            <RouterProvider router={router} />
          </Suspense>
        </AuthProvider>
        </ArticleProvider>
        </MatchesProvider>
      </React.StrictMode>
    </div>
  )
}

export default App
