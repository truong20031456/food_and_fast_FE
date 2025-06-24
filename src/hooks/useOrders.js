import { useState, useEffect } from 'react';
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

export const useOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, filters, selectedOrder } = useSelector(
    (state) => state.order
  );

  const fetchOrders = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getOrders(filters);
      dispatch(setOrders(response));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchOrderById = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await getOrderById(id);
      dispatch(setSelectedOrder(response));
      return response;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const cancelUserOrder = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await cancelOrder(id);
      await fetchOrders();
      return response;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getOrderCurrentStatus = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await getOrderStatus(id);
      return response;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getOrderTrackingHistory = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await getOrderHistory(id);
      return response;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateFilters = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  return {
    orders,
    selectedOrder,
    loading,
    error,
    filters,
    fetchOrders,
    fetchOrderById,
    cancelUserOrder,
    getOrderCurrentStatus,
    getOrderTrackingHistory,
    updateFilters,
  };
}; 