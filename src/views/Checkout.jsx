import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Alert,
} from '@mui/material';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';
import { useForm } from '../hooks/useForm';
import { addressSchema } from '../utils/validation';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const steps = ['Shipping Address', 'Review Order', 'Payment'];

// Checkout page: Quy trình nhiều bước (địa chỉ, xác nhận, thanh toán)
const Checkout = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  // Lấy state giỏ hàng
  const { items, total, loading: cartLoading, error: cartError } = useCart();
  // Lấy action tạo đơn hàng
  const { createOrder, loading: orderLoading, error: orderError } = useOrders();

  // Form địa chỉ giao hàng
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    submitError,
  } = useForm(
    {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      phone: '',
    },
    addressSchema,
    async (values) => {
      try {
        await createOrder({
          items,
          shippingAddress: values,
          total,
        });
        navigate('/order-success');
      } catch (error) {
        console.error('Error creating order:', error);
      }
    }
  );

  // Loading state
  if (cartLoading || orderLoading) {
    return <LoadingSpinner />;
  }

  // Error state
  if (cartError || orderError) {
    return (
      <ErrorMessage
        title="Error"
        message={cartError || orderError || 'An error occurred'}
      />
    );
  }

  // Empty cart state
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

  // Chuyển bước tiếp theo
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  // Quay lại bước trước
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Render nội dung từng bước
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        // Bước 1: Form địa chỉ giao hàng
        return (
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Shipping Address
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="street"
                  label="Street Address"
                  name="street"
                  value={values.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.street && Boolean(errors.street)}
                  helperText={touched.street && errors.street}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="State/Province"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.state && Boolean(errors.state)}
                  helperText={touched.state && errors.state}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.country && Boolean(errors.country)}
                  helperText={touched.country && errors.country}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="zipCode"
                  label="Zip/Postal Code"
                  name="zipCode"
                  value={values.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.zipCode && Boolean(errors.zipCode)}
                  helperText={touched.zipCode && errors.zipCode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        // Bước 2: Xác nhận đơn hàng
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Grid container spacing={2}>
              {items.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Paper elevation={1} sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Typography variant="subtitle1">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity: {item.quantity}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle1" align="right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h6">Total</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">${total.toFixed(2)}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        // Bước 3: Thanh toán (demo)
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <Typography variant="body1" paragraph>
              This is a demo application. In a real application, you would
              integrate with a payment gateway here.
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Checkout
        </Typography>

        {/* Stepper hiển thị các bước */}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Hiển thị lỗi submit form */}
        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}

        {/* Nội dung từng bước */}
        {renderStepContent(activeStep)}

        {/* Nút điều hướng bước */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Checkout; 