import api from '../config';

const ProductService = {
    getAllProducts: async (params) => {
        const response = await api.get('/products', { params });
        return response.data;
    },

    getProductById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    getProductsByCategory: async (category) => {
        const response = await api.get(`/products/category/${category}`);
        return response.data;
    },

    searchProducts: async (query) => {
        const response = await api.get('/products/search', {
            params: { q: query }
        });
        return response.data;
    },

    getProductReviews: async (productId) => {
        const response = await api.get(`/products/${productId}/reviews`);
        return response.data;
    },

    addProductReview: async (productId, reviewData) => {
        const response = await api.post(`/products/${productId}/reviews`, reviewData);
        return response.data;
    }
};

export default ProductService; 