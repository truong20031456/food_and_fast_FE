// useAuth: Custom hook truy cập AuthContext
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * useAuth - Custom hook to access authentication context
 * @returns {object} Auth context value
 * @throws {Error} If used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};