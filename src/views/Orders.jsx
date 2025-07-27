import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { useOrders } from '../hooks/useOrders';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

// Helper: Đổi màu trạng thái đơn hàng
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

// OrderRow: Component con cho từng dòng đơn hàng
const OrderRow = ({ order, onView }) => (
  <TableRow>
    <TableCell>{order.id}</TableCell>
    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
    <TableCell>${order.total.toFixed(2)}</TableCell>
    <TableCell>
      <Chip
        label={order.status}
        color={getStatusColor(order.status)}
        size="small"
      />
    </TableCell>
    <TableCell align="right">
      <IconButton color="primary" onClick={() => onView(order.id)}>
        <VisibilityIcon />
      </IconButton>
    </TableCell>
  </TableRow>
);

// Orders page: Hiển thị danh sách đơn hàng, trạng thái, điều hướng chi tiết
const Orders = () => {
  const navigate = useNavigate();
  // Lấy state và action từ useOrders hook
  const { orders, loading, error, fetchOrders } = useOrders();

  // Fetch orders khi mount
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Error state
  if (error) {
    return <ErrorMessage title="Error Loading Orders" message={error} />;
  }

  // Empty orders state
  if (orders.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No Orders Yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start shopping to see your orders here
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

  // Main orders table UI
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Orders
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} onView={(id) => navigate(`/orders/${id}`)} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Orders; 