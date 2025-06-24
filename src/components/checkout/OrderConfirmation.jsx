import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 3 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircleIcon
          sx={{ fontSize: 60, color: 'success.main', mb: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          Thank You for Your Order!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Your order has been successfully placed and is being processed.
        </Typography>
        <Typography variant="body1" paragraph>
          We'll send you an email confirmation with your order details and tracking information.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/orders')}
            >
              View Order Status
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default OrderConfirmation; 