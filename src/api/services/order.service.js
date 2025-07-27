import { api } from '../config';
import { handleApiSuccess, handleApiError } from '../../utils/apiHelpers';

const OrderService = {
    /**
     * Tạo đơn hàng
     */
    createOrder: async (orderData) => {
        try {
            const response = await api.post('/orders', orderData);
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Failed to create order');
        }
    },

    /**
     * Lấy danh sách đơn hàng
     */
    getOrders: async (params = {}) => {
        try {
            const response = await api.get('/orders', { params });
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Failed to fetch orders');
        }
    },

    /**
     * Lấy đơn hàng theo ID
     */
    getOrderById: async (id) => {
        try {
            const response = await api.get(`/orders/${id}`);
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Order not found');
        }
    },

    /**
     * Hủy đơn hàng
     */
    cancelOrder: async (id, reason = '') => {
        try {
            const response = await api.put(`/orders/${id}/cancel`, { reason });
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Failed to cancel order');
        }
    },

    /**
     * Lấy trạng thái đơn hàng
     */
    getOrderStatus: async (id) => {
        try {
            const response = await api.get(`/orders/${id}/status`);
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Failed to get order status');
        }
    },

    /**
     * Lấy lịch sử đơn hàng
     */
    getOrderHistory: async (id) => {
        try {
            const response = await api.get(`/orders/${id}/history`);
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Failed to get order history');
        }
    },

    /**
     * Cập nhật đơn hàng
     */
    updateOrder: async (id, updateData) => {
        try {
            const response = await api.put(`/orders/${id}`, updateData);
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Failed to update order');
        }
    }
};

export default OrderService;