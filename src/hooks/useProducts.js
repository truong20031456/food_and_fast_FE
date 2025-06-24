import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setProducts,
  setLoading,
  setError,
  setFilters,
} from '../store/slices/productSlice';
import { getAllProducts, getProductById, getFeaturedProducts } from '../api/products';

export const useProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error, filters } = useSelector((state) => state.product);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllProducts(filters);
      dispatch(setProducts(response));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchProductById = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await getProductById(id);
      setSelectedProduct(response);
      return response;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getFeaturedProducts();
      setFeaturedProducts(response);
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateFilters = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

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
  };
};