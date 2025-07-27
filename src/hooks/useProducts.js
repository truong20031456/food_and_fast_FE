// useProducts: Custom hook quản lý sản phẩm (fetch, cache, featured, filter)
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setProducts,
  setLoading,
  setError,
  setFilters,
} from '../store/slices/productSlice';
import ProductService from '../api/services/product.service';
import { handleError } from '../utils/apiHelpers'; // Move handleError to utils

/**
 * useProducts - Custom hook to manage product state and actions
 * @returns {object} Product state and action handlers
 */
export const useProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error, filters } = useSelector((state) => state.product);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [cache, setCache] = useState(new Map());

  /**
   * Fetch products with optional cache
   */
  const fetchProducts = useCallback(async (force = false) => {
    const cacheKey = JSON.stringify(filters);
    const now = Date.now();
    const cacheTimeout = 5 * 60 * 1000; // 5 minutes
    if (!force && cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey);
      if (now - cachedData.timestamp < cacheTimeout) {
        dispatch(setProducts(cachedData.data));
        return;
      }
    }
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await ProductService.getAllProducts(filters);
      dispatch(setProducts(response));
      setCache(prev => new Map(prev.set(cacheKey, {
        data: response,
        timestamp: now
      })));
    } catch (error) {
      handleError(dispatch, error, 'Failed to fetch products');
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, filters, cache]);

  /**
   * Fetch product by ID
   */
  const fetchProductById = useCallback(async (id) => {
    if (!id) {
      throw new Error('Product ID is required');
    }
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await ProductService.getProductById(id);
      setSelectedProduct(response);
      return response;
    } catch (error) {
      handleError(dispatch, error, 'Failed to fetch product');
      setSelectedProduct(null);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  /**
   * Fetch featured products
   */
  const fetchFeaturedProducts = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await ProductService.getFeaturedProducts();
      setFeaturedProducts(response);
    } catch (error) {
      handleError(dispatch, error, 'Failed to fetch featured products');
      setFeaturedProducts([]);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  /**
   * Update product filters
   */
  const updateFilters = useCallback((newFilters) => {
    dispatch(setFilters(newFilters));
  }, [dispatch]);

  /**
   * Refresh products (ignore cache)
   */
  const refreshProducts = useCallback(() => {
    fetchProducts(true);
  }, [fetchProducts]);

  /**
   * Clear selected product
   */
  const clearSelectedProduct = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  // Auto-fetch when filters change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    selectedProduct,
    featuredProducts,
    loading,
    error,
    filters,
    fetchProducts,
    fetchProductById,
    fetchFeaturedProducts,
    updateFilters,
    refreshProducts,
    clearSelectedProduct,
  };
};