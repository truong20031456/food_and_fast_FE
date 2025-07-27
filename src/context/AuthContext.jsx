import { useState, useEffect, createContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const clearAuthData = useCallback(() => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setError(null);
  }, []);

  const fetchUserProfile = useCallback(async () => {
    try {
      setError(null);
      const response = await axios.get('/api/users/profile');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      clearAuthData();
      setError('Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  }, [clearAuthData]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [fetchUserProfile]);

  const loginUser = useCallback(async (values) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('/api/auth/login', values);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      toast.success('Login successful!');
      navigate('/');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const loginWithGoogle = useCallback(async () => {
    try {
      setError(null);
      window.location.href = '/api/auth/google';
    } catch (error) {
      console.error('Google login error:', error);
      const message = 'Google login failed';
      setError(message);
      toast.error(message);
    }
  }, []);

  const registerUser = useCallback(async (values) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('/api/auth/register', values);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      toast.success('Registration successful!');
      navigate('/');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const logoutUser = useCallback(() => {
    clearAuthData();
    navigate('/login');
    toast.success('Logged out successfully');
  }, [clearAuthData, navigate]);

  const value = {
    user,
    loading,
    error,
    loginUser,
    loginWithGoogle,
    registerUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

