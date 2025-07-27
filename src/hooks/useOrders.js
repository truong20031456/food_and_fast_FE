// useOrders: Custom hook quản lý đơn hàng (fetch, cache, hủy, trạng thái, lịch sử, filter)
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setOrders,
  setLoading,
  setError,
  setFilters,
  setSelectedOrder,
} from '../store/slices/orderSlice';
import {
  getOrders,
  getOrderById,
  cancelOrder,
  getOrderStatus,
  getOrderHistory,
} from '../api/orders';
import { handleError } from '../utils/apiHelpers'; // Move handleError to utils

/**
 * useOrders - Custom hook to manage order state and actions
 * @returns {object} Order state and action handlers
 */
export const useOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, filters, selectedOrder } = useSelector((state) => state.order);
  const [lastFetchTime, setLastFetchTime] = useState(null);
  const [cache, setCache] = useState(new Map());

  /**
   * Fetch orders with optional cache
   */
  const fetchOrders = useCallback(async (force = false) => {
    const cacheKey = JSON.stringify(filters);
    const now = Date.now();
    const cacheTimeout = 5 * 60 * 1000; // 5 phút
    if (!force && cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey);
      if (now - cachedData.timestamp < cacheTimeout) {
        dispatch(setOrders(cachedData.data));
        return;
      }
    }
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await getOrders(filters);
      dispatch(setOrders(response));
      setCache(prev => new Map(prev.set(cacheKey, { data: response, timestamp: now })));
      setLastFetchTime(now);
    } catch (error) {
      handleError(dispatch, error, 'Failed to fetch orders');
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, filters, cache]);

  /**
   * Fetch order by ID
   */
  const fetchOrderById = useCallback(async (id) => {
    if (!id) throw new Error('Order ID is required');
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await getOrderById(id);
      dispatch(setSelectedOrder(response));
      return response;
    } catch (error) {
      handleError(dispatch, error, 'Failed to fetch order');
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  /**
   * Cancel order by ID
   */
  const cancelUserOrder = useCallback(async (id) => {
    if (!id) throw new Error('Order ID is required');
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await cancelOrder(id);
      await fetchOrders(true); // Refresh lại danh sách
      return response;
    } catch (error) {
      handleError(dispatch, error, 'Failed to cancel order');
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, fetchOrders]);

  /**
   * Get current status of order
   */
  const getOrderCurrentStatus = useCallback(async (id) => {
    if (!id) throw new Error('Order ID is required');
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await getOrderStatus(id);
      return response;
    } catch (error) {
      handleError(dispatch, error, 'Failed to get order status');
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  /**
   * Get tracking history of order
   */
  const getOrderTrackingHistory = useCallback(async (id) => {
    if (!id) throw new Error('Order ID is required');
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await getOrderHistory(id);
      return response;
    } catch (error) {
      handleError(dispatch, error, 'Failed to get order history');
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  /**
   * Update order filters
   */
  const updateFilters = useCallback((newFilters) => {
    dispatch(setFilters(newFilters));
  }, [dispatch]);

  /**
   * Refresh orders (ignore cache)
   */
  const refreshOrders = useCallback(() => {
    fetchOrders(true);
  }, [fetchOrders]);

  // Auto-fetch when filters change
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    selectedOrder,
    loading,
    error,
    filters,
    lastFetchTime,
    fetchOrders,
    fetchOrderById,
    cancelUserOrder,
    getOrderCurrentStatus,
    getOrderTrackingHistory,
    updateFilters,
    refreshOrders,
  };
};