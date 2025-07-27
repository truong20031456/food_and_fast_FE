import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { useProducts } from '../../hooks/useProducts'
import productReducer from '../../store/slices/productSlice'
import ProductService from '../../api/services/product.service'
import { mockProducts } from '../utils/test-utils'

// Mock ProductService
vi.mock('../../api/services/product.service', () => ({
  default: {
    getAllProducts: vi.fn(),
    getProductById: vi.fn(),
    getFeaturedProducts: vi.fn(),
  }
}))

// Mock store
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      product: productReducer,
    },
    preloadedState,
  })
}

const wrapper = ({ children, store }) => (
  <Provider store={store}>{children}</Provider>
)

describe('useProducts', () => {
  let store
  let mockProductService

  beforeEach(() => {
    store = createTestStore()
    mockProductService = ProductService
    vi.clearAllMocks()
  })

  it('should fetch products successfully', async () => {
    mockProductService.getAllProducts.mockResolvedValue(mockProducts)

    const { result } = renderHook(() => useProducts(), {
      wrapper: ({ children }) => wrapper({ children, store })
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(mockProductService.getAllProducts).toHaveBeenCalled()
    expect(result.current.products).toEqual(mockProducts)
    expect(result.current.error).toBeNull()
  })

  it('should handle fetch products error', async () => {
    const errorMessage = 'Failed to fetch products'
    mockProductService.getAllProducts.mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(() => useProducts(), {
      wrapper: ({ children }) => wrapper({ children, store })
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBeTruthy()
  })

  it('should update filters correctly', async () => {
    mockProductService.getAllProducts.mockResolvedValue(mockProducts)

    const { result } = renderHook(() => useProducts(), {
      wrapper: ({ children }) => wrapper({ children, store })
    })

    const newFilters = { category: 'test', priceRange: [0, 100] }
    result.current.updateFilters(newFilters)

    await waitFor(() => {
      expect(mockProductService.getAllProducts).toHaveBeenCalledWith(newFilters)
    })
  })

  it('should fetch product by ID', async () => {
    const productId = 1
    const mockProduct = mockProducts[0]
    mockProductService.getProductById.mockResolvedValue(mockProduct)

    const { result } = renderHook(() => useProducts(), {
      wrapper: ({ children }) => wrapper({ children, store })
    })

    const product = await result.current.fetchProductById(productId)

    expect(mockProductService.getProductById).toHaveBeenCalledWith(productId)
    expect(product).toEqual(mockProduct)
  })

  it('should fetch featured products', async () => {
    const featuredProducts = mockProducts.filter(p => p.featured)
    mockProductService.getFeaturedProducts.mockResolvedValue(featuredProducts)

    const { result } = renderHook(() => useProducts(), {
      wrapper: ({ children }) => wrapper({ children, store })
    })

    await result.current.fetchFeaturedProducts()

    expect(mockProductService.getFeaturedProducts).toHaveBeenCalled()
    expect(result.current.featuredProducts).toEqual(featuredProducts)
  })

  it('should refresh products when refreshProducts is called', async () => {
    mockProductService.getAllProducts.mockResolvedValue(mockProducts)

    const { result } = renderHook(() => useProducts(), {
      wrapper: ({ children }) => wrapper({ children, store })
    })

    // Wait for initial fetch
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Clear mock calls
    mockProductService.getAllProducts.mockClear()

    // Call refresh
    result.current.refreshProducts()

    await waitFor(() => {
      expect(mockProductService.getAllProducts).toHaveBeenCalled()
    })
  })

  it('should clear selected product', () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: ({ children }) => wrapper({ children, store })
    })

    result.current.clearSelectedProduct()
    expect(result.current.selectedProduct).toBeNull()
  })
}) 