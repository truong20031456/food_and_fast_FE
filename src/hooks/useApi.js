// useApi: Custom hook for handling API calls with loading, error, and data state
import { useState, useCallback } from 'react';

/**
 * useApi - Custom hook to manage API call state (loading, error, data)
 * @param {function} apiFunction - The API function to call
 * @param {object} options - Optional: { onError }
 * @returns {object} { execute, loading, error, data, reset }
 */
export const useApi = (apiFunction, options = {}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    // Execute the API call and manage state
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
                if (options.onError) options.onError(result.error);
                throw new Error(result.error);
            }
        } catch (err) {
            const errorMessage = err.message || 'An unexpected error occurred';
            setError(errorMessage);
            if (options.onError) options.onError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [apiFunction, options]);

    // Reset all state
    const reset = useCallback(() => {
        setLoading(false);
        setError(null);
        setData(null);
    }, []);

    return { execute, loading, error, data, reset };
};