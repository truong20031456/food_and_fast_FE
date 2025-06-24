import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useOrders } from '../hooks/useOrders';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'warning';
    case 'processing':
      return 'info';
    case 'shipped':
      return 'primary';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { order, loading, error, fetchOrder } = useOrders();

  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage title="Error Loading Order" message={error} />;
  }

  if (!order) {
    return (
      <ErrorMessage
        title="Order Not Found"
        message="The requested order could not be found."
      />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/orders')}
        sx={{ mb: 3 }}
      >
        Back to Orders
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" component="h1">
                Order #{order.id}
              </Typography>
              <Chip
                label={order.status}
                color={getStatusColor(order.status)}
                size="large"
              />
            </Box>
            <Typography variant="body1" color="text.secondary">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Typography variant="body1">
              {order.shippingAddress.street}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.zipCode}
              <br />
              {order.shippingAddress.country}
              <br />
              Phone: {order.shippingAddress.phone}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">
                        ${item.price.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Subtotal</Typography>
              <Typography variant="body1">${order.total.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Shipping</Typography>
              <Typography variant="body1">Free</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${order.total.toFixed(2)}</Typography>
            </Box>
          </Grid>

          {order.trackingNumber && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Tracking Information
              </Typography>
              <Typography variant="body1">
                Tracking Number: {order.trackingNumber}
              </Typography>
              {order.trackingUrl && (
                <Button
                  variant="outlined"
                  color="primary"
                  href={order.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mt: 1 }}
                >
                  Track Package
                </Button>
              )}
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default OrderDetail; 