import api from '../utils/api';

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};
export const googleLogin = async (token) => {
  const response = await api.post('/auth/google', { token });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await api.put('/auth/profile', userData);
  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await api.put('/auth/change-password', passwordData);
  return response.data;
}; 