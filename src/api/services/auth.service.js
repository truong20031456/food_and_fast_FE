import { api, TokenManager } from '../config';
import { handleApiError, handleApiSuccess } from '../../utils/apiHelpers';
import { validateEmail, validatePassword } from '../../utils/validation';

const AuthService = {
    // Register with validation
    register: async (userData) => {
        try {
            // Basic validation
            if (!validateEmail(userData.email)) {
                return handleApiError(new Error('Invalid email format'));
            }
            
            if (!validatePassword(userData.password)) {
                return handleApiError(new Error('Password must be at least 8 characters with uppercase, lowercase and number'));
            }
            
            const response = await api.post('/auth/register', userData);
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Registration failed');
        }
    },

    // Login with validation
    login: async (credentials) => {
        try {
            if (!credentials.email || !credentials.password) {
                return handleApiError(new Error('Email and password are required'));
            }
            
            const response = await api.post('/auth/login', credentials);
            
            if (response.data.token) {
                TokenManager.set(response.data.token);
            }
            
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Login failed');
        }
    },

    // Google login
    googleLogin: async (token) => {
        try {
            if (!token) {
                return handleApiError(new Error('Google token is required'));
            }
            
            const response = await api.post('/auth/google', { token });
            
            if (response.data.token) {
                TokenManager.set(response.data.token);
            }
            
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Google login failed');
        }
    },

    // Logout
    logout: async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            // Log error but still remove local token
            console.warn('Logout API call failed:', error.message);
        } finally {
            // Always remove local token
            TokenManager.remove();
        }
        
        return handleApiSuccess({ message: 'Logged out successfully' });
    },

    // Other methods remain the same but use helpers
    getCurrentUser: async () => {
        try {
            const response = await api.get('/auth/me');
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Failed to get user info');
        }
    },

    updateProfile: async (userData) => {
        try {
            const response = await api.put('/auth/profile', userData);
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Profile update failed');
        }
    },

    changePassword: async (passwordData) => {
        try {
            const { currentPassword, newPassword } = passwordData;
            
            if (!currentPassword || !newPassword) {
                return handleApiError(new Error('Current and new passwords are required'));
            }
            
            if (!validatePassword(newPassword)) {
                return handleApiError(new Error('New password must be at least 8 characters with uppercase, lowercase and number'));
            }
            
            const response = await api.put('/auth/change-password', passwordData);
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Password change failed');
        }
    },

    forgotPassword: async (email) => {
        try {
            if (!validateEmail(email)) {
                return handleApiError(new Error('Invalid email format'));
            }
            
            const response = await api.post('/auth/forgot-password', { email });
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Failed to send reset email');
        }
    },

    resetPassword: async (token, newPassword) => {
        try {
            if (!token || !newPassword) {
                return handleApiError(new Error('Token and new password are required'));
            }
            
            if (!validatePassword(newPassword)) {
                return handleApiError(new Error('Password must be at least 8 characters with uppercase, lowercase and number'));
            }
            
            const response = await api.post('/auth/reset-password', { token, newPassword });
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Password reset failed');
        }
    },

    // Utility methods
    isAuthenticated: () => {
        const token = TokenManager.get();
        return token && TokenManager.isValid(token);
    },

    getCurrentUserFromToken: () => {
        const token = TokenManager.get();
        return TokenManager.getTokenPayload(token);
    }
};

export default AuthService;