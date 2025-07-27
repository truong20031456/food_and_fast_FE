import { useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { updateQuantity, removeFromCart } from '../../store/slices/cartSlice';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      onUpdateQuantity ? onUpdateQuantity(item.id, newQuantity) : dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    onRemove ? onRemove(item.id) : dispatch(removeFromCart(item.id));
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box
            component="img"
            src={item.image}
            alt={item.name}
            sx={{
              width: 100,
              height: 100,
              objectFit: 'cover',
              borderRadius: 1,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {item.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h6" color="primary">
                ${item.price.toFixed(2)}
              </Typography>
              {item.discount > 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through' }}
                >
                  ${(item.price * (1 + item.discount / 100)).toFixed(2)}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  size="small"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  size="small"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  inputProps={{
                    min: 1,
                    style: { textAlign: 'center', width: '40px' },
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={handleRemove}
              >
                Remove
              </Button>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">Subtotal:</Typography>
          <Typography variant="subtitle1" color="primary">
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartItem; 