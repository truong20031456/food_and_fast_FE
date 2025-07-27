import { createSelector } from '@reduxjs/toolkit';
import { calculateDiscountedPrice } from '../../utils/price';

// Selector to get cart items
export const selectCartItems = (state) => state.cart.items;

// Selector to calculate total price of cart
export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce((total, item) => {
      if (!item.price || !item.quantity) return total;
      const price = calculateDiscountedPrice(item.price, item.discount);
      return total + price * item.quantity;
    }, 0)
);

// Selector to calculate total item count in cart
export const selectCartCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((count, item) => count + (item.quantity || 0), 0)
); 