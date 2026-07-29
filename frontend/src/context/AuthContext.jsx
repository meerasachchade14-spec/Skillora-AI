import { createContext, useEffect, useState } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncProfile = async () => {
      const storedUser = localStorage.getItem('skillora_user');
      const token = localStorage.getItem('skillora_token');
      
      if (token) {
        try {
          const profileData = await authService.getProfile();
          setUser(profileData);
          localStorage.setItem('skillora_user', JSON.stringify(profileData));
        } catch (error) {
          console.error("Failed to fetch profile on init:", error);
          if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('skillora_user');
            localStorage.removeItem('skillora_token');
            setUser(null);
          } else if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } else if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    syncProfile();
  }, []);

  const login = (userData) => {
    localStorage.setItem('skillora_user', JSON.stringify(userData));
    setUser(userData);
  };

  const updateUser = (userData) => {
    localStorage.setItem('skillora_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('skillora_user');
    localStorage.removeItem('skillora_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};