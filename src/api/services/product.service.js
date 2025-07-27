import { api } from '../config';
import { handleApiSuccess, handleApiError } from '../../utils/apiHelpers';

const ProductService = {
    /**
     * Get all products with pagination and filters
     */
    getAllProducts: async (params = {}) => {
        try {
            const response = await api.get('/products', { params });
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Failed to fetch products');
        }
    },

    /**
     * Get product by ID
     */
    getProductById: async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Product not found');
        }
    },

    /**
     * Get products by category
     */
    getProductsByCategory: async (categoryId) => {
        try {
            const response = await api.get('/products', { 
                params: { category_id: categoryId } 
            });
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Failed to fetch category products');
        }
    },

    /**
     * Search products
     */
    searchProducts: async (query, filters = {}) => {
        try {
            const params = { search: query, ...filters };
            const response = await api.get('/products', { params });
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Search failed');
        }
    },

    /**
     * Get product categories
     */
    getCategories: async () => {
        try {
            const response = await api.get('/categories');
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Failed to fetch categories');
        }
    },

    /**
     * Get product reviews
     */
    getProductReviews: async (productId, params = {}) => {
        try {
            const response = await api.get(`/products/${productId}/reviews`, { params });
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Failed to fetch reviews');
        }
    },

    /**
     * Add product review
     */
    addProductReview: async (productId, reviewData) => {
        try {
            const response = await api.post(`/products/${productId}/reviews`, reviewData);
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Failed to add review');
        }
    },

    /**
     * Get related products
     */
    getRelatedProducts: async (productId) => {
        try {
            const response = await api.get(`/products/${productId}/related`);
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Failed to fetch related products');
        }
    },

    /**
     * Get featured products
     */
    getFeaturedProducts: async () => {
        try {
            const response = await api.get('/products/featured');
            return handleApiSuccess(response.data);
        } catch (error) {
            return handleApiError(error, 'Failed to fetch featured products');
        }
    }
};

export default ProductService;
