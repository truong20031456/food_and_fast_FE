import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../utils/test-utils'
import ProductCard from '../../components/product/ProductCard'
import { mockProducts } from '../utils/test-utils'

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

describe('ProductCard', () => {
  const defaultProps = {
    product: mockProducts[0],
    onFavoriteToggle: vi.fn(),
  }

  it('renders product information correctly', () => {
    render(<ProductCard {...defaultProps} />)
    
    expect(screen.getByText('Test Product 1')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByText('Test description 1')).toBeInTheDocument()
    expect(screen.getByAltText('Test Product 1')).toBeInTheDocument()
  })

  it('displays discount badge when product has discount', () => {
    const productWithDiscount = { ...mockProducts[0], discount: 20 }
    render(<ProductCard product={productWithDiscount} onFavoriteToggle={vi.fn()} />)
    
    expect(screen.getByText('-20%')).toBeInTheDocument()
  })

  it('does not display discount badge when product has no discount', () => {
    render(<ProductCard {...defaultProps} />)
    
    expect(screen.queryByText(/-%\d+/)).not.toBeInTheDocument()
  })

  it('shows rating and reviews', () => {
    render(<ProductCard {...defaultProps} />)
    
    expect(screen.getByText('(10)')).toBeInTheDocument()
  })

  it('calls onFavoriteToggle when favorite button is clicked', () => {
    const mockFavoriteToggle = vi.fn()
    render(<ProductCard product={defaultProps.product} onFavoriteToggle={mockFavoriteToggle} />)
    
    const favoriteButton = screen.getByLabelText(/add to favorites/i)
    fireEvent.click(favoriteButton)
    
    expect(mockFavoriteToggle).toHaveBeenCalledWith(1, true)
  })

  it('handles image loading error gracefully', () => {
    const productWithInvalidImage = { ...mockProducts[0], image: 'invalid-url' }
    render(<ProductCard product={productWithInvalidImage} onFavoriteToggle={vi.fn()} />)
    
    const image = screen.getByAltText('Test Product 1')
    fireEvent.error(image)
    
    // Should show placeholder image
    expect(image.src).toContain('placeholder-product.jpg')
  })

  it('applies hover effects on card', () => {
    render(<ProductCard {...defaultProps} />)
    
    const card = screen.getByRole('article') || screen.getByTestId('product-card')
    expect(card).toHaveStyle('transition: all 0.3s ease-in-out')
  })
}) 