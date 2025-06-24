// src/api/config.js - Cấu hình API chính
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // Thêm timeout
});

// Token management utility
const TokenManager = {
    get: () => localStorage.getItem('user_token'),
    set: (token) => localStorage.setItem('user_token', token),
    remove: () => localStorage.removeItem('user_token'),
    isValid: (token) => {
        if (!token) return false;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    }
};

// Request interceptor với cải tiến
api.interceptors.request.use(
    (config) => {
        const token = TokenManager.get();
        if (token && TokenManager.isValid(token)) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor với xử lý lỗi tốt hơn
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { status } = error.response || {};
        
        switch (status) {
            case 401:
                TokenManager.remove();
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                break;
            case 403:
                console.warn('Access denied');
                break;
            case 500:
                console.error('Server error');
                break;
        }
        
        return Promise.reject(error);
    }
);

export { api, TokenManager };
