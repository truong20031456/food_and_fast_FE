import api from './config';

export const getAllProducts = async (params) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (categoryId) => {
  const response = await api.get('/products', { params: { category_id: categoryId } });
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await api.get('/products', { params: { search: query } });
  return response.data;
};

export const getProductCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

// Remove unused endpoints that are not implemented in the backend
// export const getProductReviews = async (productId, params) => {
//   const response = await api.get(`/products/${productId}/reviews`, { params });
//   return response.data;
// };

// export const addProductReview = async (productId, reviewData) => {
//   const response = await api.post(`/products/${productId}/reviews`, reviewData);
//   return response.data;
// };

// export const getRelatedProducts = async (productId) => {
//   const response = await api.get(`/products/${productId}/related`);
//   return response.data;
// };

// export const getFeaturedProducts = async () => {
//   const response = await api.get('/products/featured');
//   return response.data;
// };