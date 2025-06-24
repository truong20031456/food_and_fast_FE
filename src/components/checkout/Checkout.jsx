import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Divider,
  Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const steps = ['Shipping', 'Payment', 'Review'];

const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zipCode: yup.string().required('ZIP code is required'),
  cardName: yup.string().required('Name on card is required'),
  cardNumber: yup.string().required('Card number is required'),
  expDate: yup.string().required('Expiration date is required'),
  cvv: yup.string().required('CVV is required'),
});

const Checkout = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      cardName: '',
      cardNumber: '',
      expDate: '',
      cvv: '',
      saveInfo: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Here you would typically make an API call to process the order
        console.log('Order submitted:', values);
        localStorage.removeItem('cart');
        navigate('/order-confirmation');
      } catch (err) {
        setError('Failed to process order. Please try again.');
      }
    },
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    return (subtotal + tax).toFixed(2);
  };

  if (loading) return <Typography>Loading...</Typography>;
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

  const renderShippingForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Phone Number"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="address"
          name="address"
          label="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="city"
          name="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="state"
          name="state"
          label="State"
          value={formik.values.state}
          onChange={formik.handleChange}
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={formik.touched.state && formik.errors.state}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="zipCode"
          name="zipCode"
          label="ZIP Code"
          value={formik.values.zipCode}
          onChange={formik.handleChange}
          error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
          helperText={formik.touched.zipCode && formik.errors.zipCode}
        />
      </Grid>
    </Grid>
  );

  const renderPaymentForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="cardName"
          name="cardName"
          label="Name on Card"
          value={formik.values.cardName}
          onChange={formik.handleChange}
          error={formik.touched.cardName && Boolean(formik.errors.cardName)}
          helperText={formik.touched.cardName && formik.errors.cardName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="cardNumber"
          name="cardNumber"
          label="Card Number"
          value={formik.values.cardNumber}
          onChange={formik.handleChange}
          error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
          helperText={formik.touched.cardNumber && formik.errors.cardNumber}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="expDate"
          name="expDate"
          label="Expiration Date"
          placeholder="MM/YY"
          value={formik.values.expDate}
          onChange={formik.handleChange}
          error={formik.touched.expDate && Boolean(formik.errors.expDate)}
          helperText={formik.touched.expDate && formik.errors.expDate}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="cvv"
          name="cvv"
          label="CVV"
          value={formik.values.cvv}
          onChange={formik.handleChange}
          error={formik.touched.cvv && Boolean(formik.errors.cvv)}
          helperText={formik.touched.cvv && formik.errors.cvv}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="saveInfo"
              checked={formik.values.saveInfo}
              onChange={formik.handleChange}
            />
          }
          label="Save payment information for next time"
        />
      </Grid>
    </Grid>
  );

  const renderReview = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        {cartItems.map((item) => (
          <Box key={item.id} sx={{ mb: 2 }}>
            <Typography>
              {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Box>
        ))}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">
          Total: ${calculateTotal()}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Shipping Details
        </Typography>
        <Typography>
          {formik.values.firstName} {formik.values.lastName}
        </Typography>
        <Typography>{formik.values.address}</Typography>
        <Typography>
          {formik.values.city}, {formik.values.state} {formik.values.zipCode}
        </Typography>
        <Typography>{formik.values.email}</Typography>
        <Typography>{formik.values.phone}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Paper sx={{ p: 3 }}>
        <form onSubmit={formik.handleSubmit}>
          {activeStep === 0 && renderShippingForm()}
          {activeStep === 1 && renderPaymentForm()}
          {activeStep === 2 && renderReview()}
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
                type="submit"
              >
                Place Order
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Checkout; 