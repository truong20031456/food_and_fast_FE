import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateQuantity as updateQuantityAction,
  clearCart as clearCartAction,
} from '../store/slices/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart);

  const addToCart = (product) => {
    dispatch(addToCartAction(product));
  };

  const removeFromCart = (productId) => {
    dispatch(removeFromCartAction(productId));
  };

  const updateQuantity = (productId, quantity) => {
    dispatch(updateQuantityAction({ id: productId, quantity }));
  };

  const clearCart = () => {
    dispatch(clearCartAction());
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const price = item.discount > 0
        ? item.price * (1 - item.discount / 100)
        : item.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    items,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };
}; 