// useLocalization: Custom hook truy cập LocalizationContext
import { useContext } from 'react';
import { LocalizationContext } from '../context/LocalizationContext';

/**
 * useLocalization - Custom hook to access localization context
 * @returns {object} Localization context value
 */
export const useLocalization = () => useContext(LocalizationContext);