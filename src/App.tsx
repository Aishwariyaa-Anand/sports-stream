 
import { RouterProvider } from "react-router-dom";
import './App.css'
import router from "./routes"
import React from "react";
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  )
}

export default App
