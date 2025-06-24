import api from '../utils/api';

export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const getOrders = async (params) => {
  const response = await api.get('/orders', { params });
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await api.put(`/orders/${id}/cancel`);
  return response.data;
};

export const getOrderStatus = async (id) => {
  const response = await api.get(`/orders/${id}/status`);
  return response.data;
};

export const getOrderHistory = async (id) => {
  const response = await api.get(`/orders/${id}/history`);
  return response.data;
}; 