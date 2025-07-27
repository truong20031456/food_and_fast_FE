// useLocalStorage: Custom hook quản lý state đồng bộ với localStorage, hỗ trợ SSR
import { useState, useEffect, useCallback } from 'react';

const isSSR = typeof window === 'undefined';

/**
 * useLocalStorage - Custom hook to manage state synced with localStorage
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value
 * @returns {[any, function, function]} [storedValue, setValue, removeValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // Initialize state with a function to avoid SSR issues
  const [storedValue, setStoredValue] = useState(() => {
    if (isSSR) return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Set value and persist to localStorage
   */
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (!isSSR) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  /**
   * Remove value from localStorage
   */
  const removeValue = useCallback(() => {
    try {
      if (!isSSR) {
        window.localStorage.removeItem(key);
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes in localStorage from other tabs/windows
  useEffect(() => {
    if (isSSR) return;
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
};