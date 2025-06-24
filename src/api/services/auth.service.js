import { api, TokenManager } from '../config';

const AuthService = {
    // Đăng ký người dùng
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Registration failed' };
        }
    },

    // Đăng nhập thường
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            if (response.data.token) {
                TokenManager.set(response.data.token);
            }
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
    },

    // Đăng nhập Google
    googleLogin: async (token) => {
        try {
            const response = await api.post('/auth/google', { token });
            if (response.data.token) {
                TokenManager.set(response.data.token);
            }
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Google login failed' };
        }
    },

    // Đăng xuất
    logout: async () => {
        try {
            await api.post('/auth/logout');
            TokenManager.remove();
            return { success: true };
        } catch (error) {
            // Vẫn xóa token local ngay cả khi server lỗi
            TokenManager.remove();
            return { success: true };
        }
    },

    // Lấy thông tin user hiện tại
    getCurrentUser: async () => {
        try {
            const response = await api.get('/auth/me');
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Failed to get user info' };
        }
    },

    // Cập nhật profile
    updateProfile: async (userData) => {
        try {
            const response = await api.put('/auth/profile', userData);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Profile update failed' };
        }
    },

    // Đổi mật khẩu
    changePassword: async (passwordData) => {
        try {
            const response = await api.put('/auth/change-password', passwordData);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Password change failed' };
        }
    },

    // Quên mật khẩu
    forgotPassword: async (email) => {
        try {
            const response = await api.post('/auth/forgot-password', { email });
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Failed to send reset email' };
        }
    },

    // Reset mật khẩu
    resetPassword: async (token, newPassword) => {
        try {
            const response = await api.post('/auth/reset-password', { token, newPassword });
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Password reset failed' };
        }
    },

    // Kiểm tra trạng thái đăng nhập
    isAuthenticated: () => {
        const token = TokenManager.get();
        return token && TokenManager.isValid(token);
    }
};

export default AuthService;