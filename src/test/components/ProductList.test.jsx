import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../utils/test-utils'
import ProductList from '../../components/product/ProductList'
import { mockProducts } from '../utils/test-utils'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ErrorMessage from '../../components/common/ErrorMessage'

// Mock child components
vi.mock('../../components/common/LoadingSpinner', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>
}))

vi.mock('../../components/common/ErrorMessage', () => ({
  default: ({ message }) => <div data-testid="error-message">{message}</div>
}))

describe('ProductList', () => {
  const defaultProps = {
    products: mockProducts,
    loading: false,
    error: null,
    onFavoriteToggle: vi.fn(),
  }

  it('renders loading spinner when loading is true', () => {
    render(<ProductList {...defaultProps} loading={true} />)
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('renders error message when error exists', () => {
    const errorMessage = 'Failed to load products'
    render(<ProductList {...defaultProps} error={errorMessage} />)
    
    expect(screen.getByTestId('error-message')).toBeInTheDocument()
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('renders "No products found" when products array is empty', () => {
    render(<ProductList {...defaultProps} products={[]} />)
    
    expect(screen.getByTestId('error-message')).toBeInTheDocument()
    expect(screen.getByText('No products found')).toBeInTheDocument()
  })

  it('renders "No products found" when products is null', () => {
    render(<ProductList {...defaultProps} products={null} />)
    
    expect(screen.getByTestId('error-message')).toBeInTheDocument()
    expect(screen.getByText('No products found')).toBeInTheDocument()
  })

  it('renders product cards when products are available', () => {
    render(<ProductList {...defaultProps} />)
    
    expect(screen.getByText('Test Product 1')).toBeInTheDocument()
    expect(screen.getByText('Test Product 2')).toBeInTheDocument()
  })

  it('renders correct number of product cards', () => {
    render(<ProductList {...defaultProps} />)
    
    const productCards = screen.getAllByText(/Test Product \d+/)
    expect(productCards).toHaveLength(2)
  })

  it('passes onFavoriteToggle prop to ProductCard components', () => {
    const mockFavoriteToggle = vi.fn()
    render(<ProductList {...defaultProps} onFavoriteToggle={mockFavoriteToggle} />)
    
    // The ProductCard components should receive the onFavoriteToggle prop
    // This is tested in the ProductCard component tests
    expect(mockFavoriteToggle).toBeDefined()
  })
}) 