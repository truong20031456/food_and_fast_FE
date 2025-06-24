export { default as AuthService } from './services/auth.service';
export { default as ProductService } from './services/product.service';
export { default as OrderService } from './services/order.service';
export { api, TokenManager } from './config';

// ===========================================
// src/hooks/useApi.js - Custom hook để sử dụng API
import { useState, useCallback } from 'react';

export const useApi = (apiFunction) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const execute = useCallback(async (...args) => {
        try {
            setLoading(true);
            setError(null);
            const result = await apiFunction(...args);
            
            if (result.success) {
                setData(result.data);
                return result.data;
            } else {
                setError(result.error);
                throw new Error(result.error);
            }
        } catch (err) {
            const errorMessage = err.message || 'An unexpected error occurred';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [apiFunction]);

    const reset = useCallback(() => {
        setLoading(false);
        setError(null);
        setData(null);
    }, []);

    return { execute, loading, error, data, reset };
};