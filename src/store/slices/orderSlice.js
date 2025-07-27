import { createSlice } from '@reduxjs/toolkit';

// Initial state for order management
const initialState = {
  orders: [],           // Danh sách đơn hàng
  selectedOrder: null,  // Đơn hàng đang xem chi tiết
  filters: {
    status: 'all',
    dateRange: null,
    search: '',
  },
  loading: false,       // Trạng thái loading khi fetch API
  error: null,          // Thông báo lỗi
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    /**
     * Cập nhật danh sách đơn hàng, reset loading & error
     */
    setOrders: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },
    /**
     * Chọn đơn hàng đang xem chi tiết
     */
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    /**
     * Cập nhật bộ lọc đơn hàng
     */
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    /**
     * Cập nhật trạng thái đơn hàng theo id
     */
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(order => order.id === orderId);
      if (order) {
        order.status = status;
      }
      if (state.selectedOrder?.id === orderId) {
        state.selectedOrder.status = status;
      }
    },
    /**
     * Đặt trạng thái loading khi fetch API
     */
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    /**
     * Đặt thông báo lỗi và reset loading
     */
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setOrders,
  setSelectedOrder,
  setFilters,
  updateOrderStatus,
  setLoading,
  setError,
} = orderSlice.actions;

export default orderSlice.reducer; 