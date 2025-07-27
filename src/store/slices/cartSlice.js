import { createSlice } from '@reduxjs/toolkit';

// Initial state for cart management
const initialState = {
  items: [],      // List of products in cart
  loading: false, // Loading state for cart actions
  error: null,    // Error message
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Add product to cart. If already exists, increase quantity.
     */
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    /**
     * Remove product from cart by id
     */
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    /**
     * Update product quantity in cart
     */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    /**
     * Clear all items in cart
     */
    clearCart: (state) => {
      state.items = [];
    },
    /**
     * Set loading state for cart actions
     */
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    /**
     * Set error message for cart actions
     */
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setLoading,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer; 