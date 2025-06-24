import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  Divider,
  TextField,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch cart items from your API
    // For now, we'll use localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleQuantityChange = (itemId, change) => {
    const newCart = cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCart(newCart);
  };

  const handleRemoveItem = (itemId) => {
    const newCart = cartItems.filter(item => item.id !== itemId);
    updateCart(newCart);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (cartItems.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/products')}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <Grid container>
                <Grid item xs={4} sm={3}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.name}
                  />
                </Grid>
                <Grid item xs={8} sm={9}>
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        size="small"
                        value={item.quantity}
                        inputProps={{ min: 1, style: { textAlign: 'center' } }}
                        sx={{ width: '60px', mx: 1 }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveItem(item.id)}
                        sx={{ ml: 2 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography>Subtotal</Typography>
                </Grid>
                <Grid item>
                  <Typography>${calculateSubtotal().toFixed(2)}</Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                <Grid item>
                  <Typography>Shipping</Typography>
                </Grid>
                <Grid item>
                  <Typography>Free</Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                <Grid item>
                  <Typography>Tax</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    ${(calculateSubtotal() * 0.1).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
              <Grid item>
                <Typography variant="h6">Total</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  ${(calculateSubtotal() * 1.1).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart; 