// useCart: Custom hook quản lý giỏ hàng (add, remove, update, clear, tính tổng, đếm số lượng)
import { selectCartTotal, selectCartCount } from '../store/selectors/cartSelectors';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateQuantity as updateQuantityAction,
  clearCart as clearCartAction,
} from '../store/slices/cartSlice';
import { calculateDiscountedPrice } from '../utils/price';

// Utility: Validate product and productId
const isValidProduct = (product) => product && product.id;
const isValidProductId = (id) => !!id;

/**
 * useCart - Custom hook to manage cart state and actions
 * @returns {object} Cart state and action handlers
 */
export const useCart = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart);

  /**
   * Add product to cart
   */
  const addToCart = useCallback((product) => {
    if (!isValidProduct(product)) {
      console.error('Invalid product data');
      return;
    }
    dispatch(addToCartAction(product));
  }, [dispatch]);

  /**
   * Remove product from cart by ID
   */
  const removeFromCart = useCallback((productId) => {
    if (!isValidProductId(productId)) {
      console.error('Product ID is required');
      return;
    }
    dispatch(removeFromCartAction(productId));
  }, [dispatch]);

  /**
   * Update product quantity in cart
   */
  const updateQuantity = useCallback((productId, quantity) => {
    if (!isValidProductId(productId) || quantity < 0) {
      console.error('Invalid product ID or quantity');
      return;
    }
    if (quantity === 0) {
      dispatch(removeFromCartAction(productId));
    } else {
      dispatch(updateQuantityAction({ id: productId, quantity }));
    }
  }, [dispatch]);

  /**
   * Clear all items in cart
   */
  const clearCart = useCallback(() => {
    dispatch(clearCartAction());
  }, [dispatch]);

  const total = useSelector(selectCartTotal);
  const count = useSelector(selectCartCount);

  return {
    items,
    loading,
    error,
    total,
    count,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};