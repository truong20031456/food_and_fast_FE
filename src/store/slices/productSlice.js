import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
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
    setProducts: (state, action) => {
      state.products = action.payload.products;
      state.pagination.total = action.payload.total;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to first page when filters change
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
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