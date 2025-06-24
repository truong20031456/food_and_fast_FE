import { api } from '../config';

const ProductService = {
    // Lấy tất cả sản phẩm với pagination và filters
    getAllProducts: async (params = {}) => {
        try {
            const response = await api.get('/products', { params });
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Failed to fetch products' };
        }
    },

    // Lấy sản phẩm theo ID
    getProductById: async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Product not found' };
        }
    },

    // Lấy sản phẩm theo danh mục (thống nhất endpoint)
    getProductsByCategory: async (categoryId) => {
        try {
            const response = await api.get('/products', { 
                params: { category_id: categoryId } 
            });
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Failed to fetch category products' };
        }
    },

    // Tìm kiếm sản phẩm (thống nhất endpoint)
    searchProducts: async (query, filters = {}) => {
        try {
            const params = { search: query, ...filters };
            const response = await api.get('/products', { params });
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Search failed' };
        }
    },

    // Lấy danh mục sản phẩm
    getCategories: async () => {
        try {
            const response = await api.get('/categories');
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Failed to fetch categories' };
        }
    },

    // Lấy đánh giá sản phẩm
    getProductReviews: async (productId, params = {}) => {
        try {
            const response = await api.get(`/products/${productId}/reviews`, { params });
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Failed to fetch reviews' };
        }
    },

    // Thêm đánh giá sản phẩm
    addProductReview: async (productId, reviewData) => {
        try {
            const response = await api.post(`/products/${productId}/reviews`, reviewData);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Failed to add review' };
        }
    },

    // Lấy sản phẩm liên quan
    getRelatedProducts: async (productId) => {
        try {
            const response = await api.get(`/products/${productId}/related`);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Failed to fetch related products' };
        }
    },

    // Lấy sản phẩm nổi bật
    getFeaturedProducts: async () => {
        try {
            const response = await api.get('/products/featured');
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Failed to fetch featured products' };
        }
    }
};

export default ProductService;
