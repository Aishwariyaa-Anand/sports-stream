// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { API_ENDPOINT } from '../config/constants';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState({ sports: [], teams: [] });

  const signIn = async (userData) => {
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    await fetchPreferences();
  };

  const signOut = () => {
    setUser(null);
    setPreferences({ sports: [], teams: [] });
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
      setPreferences(data.preferences);
      localStorage.setItem('preferences', JSON.stringify(data.preferences));
    } catch (error) {
      console.error('Failed to fetch preferences', error);
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    const storedPreferences = localStorage.getItem('preferences');
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
    if (storedPreferences) {
      setPreferences(JSON.parse(storedPreferences));
    } else if (storedUserData) {
      fetchPreferences();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, preferences, setPreferences }}>
      {children}
    </AuthContext.Provider>
  );
};
