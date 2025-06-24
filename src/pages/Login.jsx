import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Alert,
  Grid,
  Divider,
  IconButton,
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { loginSchema } from '../utils/validation';

const Login = () => {
  const { loginUser, loginWithGoogle } = useAuth();
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
      email: '',
      password: '',
    },
    loginSchema,
    loginUser
  );

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                pr: { md: 4 },
              }}
            >
              <Typography variant="h3" component="h1" gutterBottom>
                Welcome Back!
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Sign in to continue to your account and explore our delicious food options.
              </Typography>
              <Box
                component="img"
                src="/images/login-illustration.svg"
                alt="Login"
                sx={{
                  width: '100%',
                  maxWidth: 400,
                  height: 'auto',
                  mt: 4,
                  display: { xs: 'none', md: 'block' },
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: 'background.paper',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography variant="h4" component="h2" gutterBottom align="center">
                Sign In
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
                Enter your credentials to access your account
              </Typography>

              {submitError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {submitError}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ mb: 2 }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ mb: 3 }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  sx={{ mb: 3 }}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>

                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    OR
                  </Typography>
                </Divider>

                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  startIcon={<GoogleIcon />}
                  onClick={handleGoogleLogin}
                  sx={{
                    mb: 3,
                    borderColor: 'divider',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'primary.lighter',
                    },
                  }}
                >
                  Continue with Google
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Don't have an account?
                  </Typography>
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Create an account
                  </Link>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login; 