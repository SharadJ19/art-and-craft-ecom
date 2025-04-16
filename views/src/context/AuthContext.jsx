import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track initial loading state

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await api.get('/auth/profile');
        setUser(userData);
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false); // Always set loading to false when done
      }
    };

    checkAuth();
  }, []);

  
  

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // The response data already contains the token and user info
      localStorage.setItem('token', response.token);
      setUser({
        id: response.id,
        name: response.name,
        email: response.email,
        isAdmin: response.isAdmin
      });
      return { success: true };
      
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };

  

  const register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      console.log('Registration response:', response); // Debug log
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        setUser({
          id: response.id,
          name: response.name,
          email: response.email,
          isAdmin: response.isAdmin
        });
        return { success: true };
      } else {
        return { 
          success: false, 
          message: response.message || 'Registration failed' 
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);