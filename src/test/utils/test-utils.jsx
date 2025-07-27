import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// Import your slices
import authReducer from '../../store/slices/authSlice'
import cartReducer from '../../store/slices/cartSlice'
import productReducer from '../../store/slices/productSlice'
import orderReducer from '../../store/slices/orderSlice'

// Create a test theme
const testTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

// Create a test store
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      product: productReducer,
      order: orderReducer,
    },
    preloadedState,
  })
}

// Custom render function that includes providers
const customRender = (ui, {
  preloadedState = {},
  store = createTestStore(preloadedState),
  route = '/',
  ...renderOptions
} = {}) => {
  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <ThemeProvider theme={testTheme}>
          <CssBaseline />
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    )
  }

  // Set up router if route is provided
  if (route !== '/') {
    window.history.pushState({}, 'Test page', route)
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }
export { createTestStore }

// Mock data for tests
export const mockProducts = [
  {
    id: 1,
    name: 'Test Product 1',
    price: 29.99,
    description: 'Test description 1',
    image: 'https://via.placeholder.com/300x200',
    rating: 4.5,
    reviews: 10,
    discount: 0,
    category: 'test-category'
  },
  {
    id: 2,
    name: 'Test Product 2',
    price: 39.99,
    description: 'Test description 2',
    image: 'https://via.placeholder.com/300x200',
    rating: 4.0,
    reviews: 5,
    discount: 10,
    category: 'test-category'
  }
]

export const mockUser = {
  id: 1,
  email: 'test@example.com',
  name: 'Test User',
  avatar: 'https://via.placeholder.com/100x100'
}

export const mockCartItem = {
  id: 1,
  name: 'Test Product',
  price: 29.99,
  quantity: 2,
  image: 'https://via.placeholder.com/300x200'
} 