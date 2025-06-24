import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/cart/CartItem';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const Cart = () => {
  const navigate = useNavigate();
  const {
    items,
    loading,
    error,
    total,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage title="Error Loading Cart" message={error} />;
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Add some products to your cart to continue shopping
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products')}
          >
            Browse Products
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="body1">Subtotal</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">${total.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="body1">Shipping</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">Free</Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">Total</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">${total.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/checkout')}
              sx={{ mb: 2 }}
            >
              Proceed to Checkout
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart; 