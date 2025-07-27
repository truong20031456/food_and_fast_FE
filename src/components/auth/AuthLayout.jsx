import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Restaurant as RestaurantIcon } from '@mui/icons-material';
import './AuthLayout.css';

const AuthLayout = ({ 
  children, 
  title, 
  subtitle, 
  illustration, 
  isLogin = false 
}) => {
  const theme = useTheme();

  return (
    <Box 
      className="auth-background" 
      sx={{ 
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Floating elements */}
      <Box 
        className="floating-element" 
        sx={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: alpha(theme.palette.common.white, 0.1),
          top: '10%',
          left: '5%',
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      <Box 
        className="floating-element" 
        sx={{
          position: 'absolute',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: alpha(theme.palette.common.white, 0.05),
          top: '60%',
          right: '10%',
          animation: 'float 8s ease-in-out infinite reverse'
        }}
      />
      <Box 
        className="floating-element" 
        sx={{
          position: 'absolute',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: alpha(theme.palette.common.white, 0.08),
          bottom: '20%',
          left: '15%',
          animation: 'float 7s ease-in-out infinite'
        }}
      />

      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} sx={{ minHeight: '90vh', alignItems: 'center' }}>
          {/* Left side - Illustration */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '100%',
                  pr: { md: 4 },
                  color: 'white',
                }}
              >
                {/* Brand Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <RestaurantIcon sx={{ fontSize: 48, mr: 2, color: 'white' }} />
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    sx={{ 
                      fontWeight: 800,
                      background: 'linear-gradient(45deg, #FFF 30%, #FFE082 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Food & Fast
                  </Typography>
                </Box>
                
                {/* Main Title */}
                <Typography 
                  variant="h4" 
                  component="h2" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    mb: 2,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {title}
                </Typography>
                
                {/* Subtitle */}
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 4, 
                    opacity: 0.9, 
                    lineHeight: 1.6,
                    maxWidth: '90%'
                  }}
                >
                  {subtitle}
                </Typography>

                {/* Feature highlights */}
                <Box sx={{ mb: 4 }}>
                  {[
                    {
                      icon: '🍽️',
                      text: isLogin ? 'Access your favorite dishes' : 'Discover amazing Vietnamese cuisine',
                    },
                    {
                      icon: '🚚',
                      text: isLogin ? 'Track your orders in real-time' : 'Fast delivery to your doorstep',
                    },
                    {
                      icon: '💳',
                      text: isLogin ? 'Secure payment methods' : 'Safe and secure transactions',
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    >
                      <Box 
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2,
                          p: 2,
                          borderRadius: 2,
                          background: alpha(theme.palette.common.white, 0.1),
                          backdropFilter: 'blur(10px)',
                          border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: alpha(theme.palette.common.white, 0.15),
                            transform: 'translateX(5px)'
                          }
                        }}
                      >
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            mr: 2,
                            fontSize: '1.5rem'
                          }}
                        >
                          {feature.icon}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            opacity: 0.95,
                            fontWeight: 500
                          }}
                        >
                          {feature.text}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>

                {/* Stats */}
                <Box 
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    maxWidth: '400px',
                    mt: 2
                  }}
                >
                  {[
                    { number: '10K+', label: 'Happy Customers' },
                    { number: '500+', label: 'Delicious Dishes' },
                    { number: '30min', label: 'Fast Delivery' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                    >
                      <Box 
                        sx={{
                          textAlign: 'center',
                          p: 1.5,
                          borderRadius: 2,
                          background: alpha(theme.palette.common.white, 0.1),
                          backdropFilter: 'blur(5px)',
                          minWidth: '80px'
                        }}
                      >
                        <Typography 
                          variant="h4" 
                          sx={{
                            fontWeight: 700,
                            mb: 0.5,
                            fontSize: { xs: '1.5rem', md: '2rem' },
                            background: 'linear-gradient(45deg, #FFF 30%, #FFE082 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}
                        >
                          {stat.number}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{
                            opacity: 0.8,
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: 0.5
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Right side - Auth Form */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Paper
                elevation={24}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 4,
                  background: alpha(theme.palette.background.paper, 0.95),
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
                  boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.1)}`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                  }
                }}
              >
                {children}
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </Box>
  );
};

export default AuthLayout;