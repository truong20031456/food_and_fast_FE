import axios from 'axios';

// API base URL lấy từ biến môi trường hoặc mặc định
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Khởi tạo instance Axios với cấu hình mặc định
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

/**
 * TokenManager - Quản lý JWT token trong localStorage, kiểm tra hạn, decode payload
 */
const TokenManager = {
    TOKEN_KEY: 'user_token',
    // Lấy token từ localStorage
    get() {
        return localStorage.getItem(this.TOKEN_KEY);
    },
    // Lưu token vào localStorage
    set(token) {
        if (token) {
            localStorage.setItem(this.TOKEN_KEY, token);
        }
    },
    // Xóa token khỏi localStorage
    remove() {
        localStorage.removeItem(this.TOKEN_KEY);
    },
    // Kiểm tra token hợp lệ (JWT, chưa hết hạn, buffer 5 phút)
    isValid(token) {
        if (!token) return false;
        try {
            // Kiểm tra format JWT
            const parts = token.split('.');
            if (parts.length !== 3) return false;
            // Decode payload
            const payload = JSON.parse(atob(parts[1]));
            // Kiểm tra expiration với buffer 5 phút
            const now = Date.now();
            const exp = payload.exp * 1000;
            const buffer = 5 * 60 * 1000; // 5 minutes
            return exp > (now + buffer);
        } catch (error) {
            console.warn('Invalid token format:', error);
            return false;
        }
    },
    // Lấy thông tin user từ token
    getTokenPayload(token) {
        if (!token || !this.isValid(token)) return null;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload;
        } catch {
            return null;
        }
    }
};

/**
 * Request interceptor - Tự động thêm Authorization header nếu có token hợp lệ
 */
api.interceptors.request.use(
    (config) => {
        const token = TokenManager.get();
        // Chỉ thêm token nếu nó valid
        if (token && TokenManager.isValid(token)) {
            config.headers.Authorization = `Bearer ${token}`;
        } else if (token) {
            // Token hết hạn, xóa luôn
            TokenManager.remove();
        }
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

/**
 * Response interceptor - Xử lý lỗi HTTP phổ biến, tự động redirect khi 401
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;
        const status = response?.status;
        // Xử lý các lỗi HTTP
        switch (status) {
            case 401:
                // Unauthorized - xóa token và redirect
                TokenManager.remove();
                // Chỉ redirect nếu không phải trang login/register
                if (typeof window !== 'undefined' && 
                    window.location.pathname !== '/login' && 
                    window.location.pathname !== '/register') {
                    window.location.href = '/login';
                }
                break;
            case 403:
                console.warn('Access forbidden:', response?.data?.message);
                break;
            case 404:
                console.warn('Resource not found:', error.config?.url);
                break;
            case 422:
                console.warn('Validation error:', response?.data);
                break;
            case 429:
                console.warn('Rate limit exceeded');
                break;
            case 500:
            case 502:
            case 503:
            case 504:
                console.error('Server error:', status);
                break;
            default:
                if (status >= 400) {
                    console.error('HTTP error:', status, response?.data);
                }
        }
        return Promise.reject(error);
    }
);

// Export instance và TokenManager
export { api, TokenManager };