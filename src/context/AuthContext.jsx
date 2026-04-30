import React, { createContext, useState, useEffect, useContext } from 'react';
import { TOKEN_AUTH_URL, TOKEN_KEY } from '../utils/constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${TOKEN_AUTH_URL}?action=getToken&key=${TOKEN_KEY}`);
        const data = await response.json();
        
        if (data.success && data.token) {
          setToken(data.token);
        } else {
          throw new Error(data.message || 'Error al obtener el token');
        }
      } catch (err) {
        console.error('Auth Error:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
