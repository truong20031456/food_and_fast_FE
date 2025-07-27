import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  Grid,
  Divider,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Google as GoogleIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// AuthTextField: for text/email fields
const AuthTextField = ({ 
  id, 
  label, 
  name, 
  value, 
  onChange, 
  onBlur, 
  error, 
  helperText, 
  autoComplete, 
  autoFocus, 
  startIcon,
  ...props 
}) => {
  const theme = useTheme();
  
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id={id}
      label={label}
      name={name}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      value={value || ''}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText || ' '}
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">
            {startIcon}
          </InputAdornment>
        ),
      }}
      sx={{
        mb: 2,
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          minHeight: '56px',
          transition: 'all 0.3s ease',
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(theme.palette.primary.main, 0.5),
            },
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: '2px',
            },
          },
        },
        '& .MuiFormHelperText-root': {
          marginLeft: 0,
          marginRight: 0,
          minHeight: '22px',
          position: 'relative',
          bottom: 0,
        },
        '& .MuiInputLabel-root': {
          '&.Mui-focused': {
            color: theme.palette.primary.main,
          },
        },
        position: 'relative',
      }}
      {...props}
    />
  );
};

// AuthPasswordField: for password/confirm password fields
const AuthPasswordField = ({ 
  id, 
  label, 
  name, 
  value, 
  onChange, 
  onBlur, 
  error, 
  helperText, 
  show, 
  setShow, 
  autoComplete,
  ...props 
}) => {
  const theme = useTheme();
  
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name={name}
      label={label}
      type={show ? 'text' : 'password'}
      id={id}
      autoComplete={autoComplete}
      value={value || ''}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText || ' '}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon color="action" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton 
              onClick={() => setShow(!show)} 
              edge="end"
              aria-label={show ? 'Hide password' : 'Show password'}
              sx={{
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        mb: 2,
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          minHeight: '56px',
          transition: 'all 0.3s ease',
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(theme.palette.primary.main, 0.5),
            },
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: '2px',
            },
          },
        },
        '& .MuiFormHelperText-root': {
          marginLeft: 0,
          marginRight: 0,
          minHeight: '22px',
          position: 'relative',
          bottom: 0,
        },
        '& .MuiInputLabel-root': {
          '&.Mui-focused': {
            color: theme.palette.primary.main,
          },
        },
        position: 'relative',
      }}
      {...props}
    />
  );
};

// AuthGoogleButton: for Google login/register
const AuthGoogleButton = ({ onClick, disabled, children = "Continue with Google" }) => {
  const theme = useTheme();
  
  return (
    <Button
      fullWidth
      variant="outlined"
      size="large"
      startIcon={<GoogleIcon />}
      onClick={onClick}
      disabled={disabled}
      sx={{
        mb: 3,
        py: 1.5,
        borderRadius: 2,
        fontSize: '1rem',
        fontWeight: 500,
        textTransform: 'none',
        borderColor: alpha(theme.palette.text.primary, 0.2),
        color: theme.palette.text.primary,
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: theme.palette.primary.main,
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          transform: 'translateY(-1px)',
          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
        },
        '&:disabled': {
          opacity: 0.6,
        },
      }}
    >
      {children}
    </Button>
  );
};

// AuthSwitchLink: for switching between login/register
const AuthSwitchLink = ({ isLogin }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
      </Typography>
      <Link
        component={RouterLink}
        to={isLogin ? '/register' : '/login'}
        variant="body2"
        sx={{
          fontWeight: 600,
          textDecoration: 'none',
          color: theme.palette.primary.main,
          transition: 'all 0.3s ease',
          '&:hover': {
            textDecoration: 'underline',
            transform: 'translateY(-1px)',
          },
        }}
      >
        {isLogin ? 'Create an account' : 'Sign in'}
      </Link>
    </Box>
  );
};

const AuthForm = ({
  type = 'login', // 'login' or 'register'
  values = {},
  errors = {},
  touched = {},
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting = false,
  submitError,
  onGoogleAuth,
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const isLogin = type === 'login';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <motion.div variants={itemVariants}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 2,
            }}
          >
            {isLogin ? 'Welcome Back!' : 'Join Our Community'}
          </Typography>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              fontSize: { xs: '1rem', md: '1.1rem' }, 
              opacity: 0.8,
              maxWidth: '400px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            {isLogin 
              ? 'Sign in to continue your culinary journey' 
              : 'Create your account and start exploring delicious Vietnamese cuisine'
            }
          </Typography>
        </motion.div>
      </Box>

      {/* Error Alert */}
      {submitError && (
        <motion.div variants={itemVariants}>
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3, 
              borderRadius: 2,
              '& .MuiAlert-icon': {
                fontSize: '1.5rem',
              },
            }}
          >
            {submitError}
          </Alert>
        </motion.div>
      )}

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {/* Name Fields for Register */}
        {!isLogin && (
          <motion.div variants={itemVariants}>
            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid item xs={12} sm={6}>
                <AuthTextField
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  startIcon={<PersonIcon color="action" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AuthTextField
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  startIcon={<PersonIcon color="action" />}
                />
              </Grid>
            </Grid>
          </motion.div>
        )}

        {/* Email Field */}
        <motion.div variants={itemVariants}>
          <AuthTextField
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus={isLogin}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            startIcon={<EmailIcon color="action" />}
          />
        </motion.div>

        {/* Password Field */}
        <motion.div variants={itemVariants}>
          <AuthPasswordField
            name="password"
            label="Password"
            id="password"
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            show={showPassword}
            setShow={setShowPassword}
          />
        </motion.div>

        {/* Confirm Password Field for Register */}
        {!isLogin && (
          <motion.div variants={itemVariants}>
            <AuthPasswordField
              name="confirmPassword"
              label="Confirm Password"
              id="confirmPassword"
              autoComplete="new-password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              show={showConfirmPassword}
              setShow={setShowConfirmPassword}
            />
          </motion.div>
        )}

        {/* Remember Me & Forgot Password for Login */}
        {isLogin && (
          <motion.div variants={itemVariants}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 3,
              flexWrap: 'wrap',
              gap: 1,
            }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                    sx={{
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2">
                    Remember me
                  </Typography>
                }
              />
              <Link
                component={RouterLink}
                to="/forgot-password"
                variant="body2"
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: theme.palette.primary.main,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    textDecoration: 'underline',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                Forgot password?
              </Link>
            </Box>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isSubmitting}
            sx={{
              mb: 3,
              py: 1.5,
              borderRadius: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
              },
              '&:disabled': {
                opacity: 0.7,
                transform: 'none',
              },
            }}
          >
            {isSubmitting 
              ? (isLogin ? 'Signing in...' : 'Creating Account...') 
              : (isLogin ? 'Sign In' : 'Create Account')
            }
          </Button>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants}>
          <Divider sx={{ my: 3 }}>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                px: 2,
                fontWeight: 500,
              }}
            >
              OR
            </Typography>
          </Divider>
        </motion.div>

        {/* Google Button */}
        <motion.div variants={itemVariants}>
          <AuthGoogleButton
            onClick={onGoogleAuth}
            disabled={isSubmitting}
          />
        </motion.div>

        {/* Switch Link */}
        <motion.div variants={itemVariants}>
          <AuthSwitchLink isLogin={isLogin} />
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default AuthForm;