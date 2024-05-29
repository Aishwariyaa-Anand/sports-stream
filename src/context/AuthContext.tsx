// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { API_ENDPOINT } from '../config/constants';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState(null);

  const signIn = async (userData) => {
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    await fetchPreferences();
  };

  const signOut = () => {
    setUser(null);
    setPreferences(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
  };

  const fetchPreferences = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const data = await response.json();
      setPreferences(data);
    } catch (error) {
      console.error('Failed to fetch preferences', error);
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
      fetchPreferences();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, preferences, setPreferences }}>
      {children}
    </AuthContext.Provider>
  );
};
