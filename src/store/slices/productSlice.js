import { createSlice } from '@reduxjs/toolkit';

// Initial state for product management
const initialState = {
  products: [],           // Danh sách sản phẩm
  selectedProduct: null,  // Sản phẩm đang xem chi tiết
  loading: false,         // Trạng thái loading khi fetch API
  error: null,            // Thông báo lỗi
  filters: {
    category: '',
    search: '',
    sort: 'newest',
    priceRange: [0, 1000],
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    /**
     * Cập nhật danh sách sản phẩm và tổng số lượng (phân trang)
     */
    setProducts: (state, action) => {
      state.products = action.payload.products;
      state.pagination.total = action.payload.total;
    },
    /**
     * Chọn sản phẩm đang xem chi tiết
     */
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    /**
     * Đặt trạng thái loading (thường dùng khi fetch API)
     */
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    /**
     * Đặt thông báo lỗi
     */
    setError: (state, action) => {
      state.error = action.payload;
    },
    /**
     * Cập nhật bộ lọc sản phẩm, reset về trang 1
     */
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    /**
     * Cập nhật thông tin phân trang
     */
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    /**
     * Xóa toàn bộ bộ lọc, reset về mặc định
     */
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.page = 1;
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  setLoading,
  setError,
  setFilters,
  setPagination,
  clearFilters,
} = productSlice.actions;

export default productSlice.reducer; 