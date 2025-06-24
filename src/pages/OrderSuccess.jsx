import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from '@mui/material';
import { useCart } from '../hooks/useCart';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart after successful order
    clearCart();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircleOutlineIcon
          color="success"
          sx={{ fontSize: 80, mb: 2 }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          Order Placed Successfully!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Thank you for your purchase. We have sent a confirmation email with your
          order details.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/orders')}
          >
            View Orders
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderSuccess; 