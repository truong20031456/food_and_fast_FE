import { api } from '../config';

const OrderService = {
    // Tạo đơn hàng
    createOrder: async (orderData) => {
        try {
            const response = await api.post('/orders', orderData);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Failed to create order' };
        }
    },

    // Lấy danh sách đơn hàng
    getOrders: async (params = {}) => {
        try {
            const response = await api.get('/orders', { params });
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Failed to fetch orders' };
        }
    },

    // Lấy đơn hàng theo ID
    getOrderById: async (id) => {
        try {
            const response = await api.get(`/orders/${id}`);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Order not found' };
        }
    },

    // Hủy đơn hàng
    cancelOrder: async (id, reason = '') => {
        try {
            const response = await api.put(`/orders/${id}/cancel`, { reason });
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Failed to cancel order' };
        }
    },

    // Lấy trạng thái đơn hàng
    getOrderStatus: async (id) => {
        try {
            const response = await api.get(`/orders/${id}/status`);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Failed to get order status' };
        }
    },

    // Lấy lịch sử đơn hàng
    getOrderHistory: async (id) => {
        try {
            const response = await api.get(`/orders/${id}/history`);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Failed to get order history' };
        }
    },

    // Cập nhật đơn hàng
    updateOrder: async (id, updateData) => {
        try {
            const response = await api.put(`/orders/${id}`, updateData);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Failed to update order' };
        }
    }
};

export default OrderService;