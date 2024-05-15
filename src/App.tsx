 
import { RouterProvider } from "react-router-dom";
import './App.css'
import router from "./routes"
import { AuthProvider } from './context/AuthContext';
import React from "react";

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
