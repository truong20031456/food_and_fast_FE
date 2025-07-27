// Calculate discounted price given price and discount percentage
export function calculateDiscountedPrice(price, discount = 0) {
  if (!price) return 0;
  if (discount > 0) {
    return price * (1 - discount / 100);
  }
  return price;
} 