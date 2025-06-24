import api from '../config';

const AuthService = {
    register: async (userData) => {
        const response = await api.post('/users/register', userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/users/login', credentials);
        if (response.data.token) {
            localStorage.setItem('user_token', response.data.token);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('user_token');
    },

    getCurrentUser: async () => {
        const response = await api.get('/users/me');
        return response.data;
    },

    updateProfile: async (userData) => {
        const response = await api.put('/users/profile', userData);
        return response.data;
    },

    changePassword: async (passwordData) => {
        const response = await api.put('/users/change-password', passwordData);
        return response.data;
    },

    forgotPassword: async (email) => {
        const response = await api.post('/users/forgot-password', { email });
        return response.data;
    },

    resetPassword: async (token, newPassword) => {
        const response = await api.post('/users/reset-password', {
            token,
            newPassword,
        });
        return response.data;
    }
};

export default AuthService; 