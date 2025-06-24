import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  selectedOrder: null,
  filters: {
    status: 'all',
    dateRange: null,
    search: '',
  },
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
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