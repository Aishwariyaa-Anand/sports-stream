 
import { RouterProvider } from "react-router-dom";
import './App.css'
import router from "./routes"
import { AuthProvider } from './context/AuthContext';
import { ArticleProvider } from './context/article/context';
import React from "react";

function App() {
  return (
    <div>
      <React.StrictMode>
        <ArticleProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        </ArticleProvider>
      </React.StrictMode>
    </div>
  )
}

export default App
