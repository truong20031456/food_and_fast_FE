import { Box, Container, Grid, Typography, Link, IconButton, Stack, Divider, Chip } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as TimeIcon,
  Star as StarIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  RestaurantMenu as MenuIcon,
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '/', icon: '🏠' },
    { label: 'Menu', href: '/menu', icon: '🍽️' },
    { label: 'Orders', href: '/orders', icon: '📦' },
    { label: 'About Us', href: '/about', icon: 'ℹ️' },
    { label: 'Contact', href: '/contact', icon: '📞' },
    { label: 'FAQ', href: '/faq', icon: '❓' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Refund Policy', href: '/refund' },
  ];

  const features = [
    { icon: <ShippingIcon />, text: 'Free Delivery Over $25' },
    { icon: <TimeIcon />, text: '30 Min Delivery' },
    { icon: <SecurityIcon />, text: 'Secure Payment' },
    { icon: <StarIcon />, text: '4.8★ Rating' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900',
        color: 'white',
        mt: 'auto',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24)',
        }
      }}
    >
      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.800', py: 2 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    textAlign: 'center',
                  }}
                >
                  <Box sx={{ color: 'primary.main' }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    {feature.text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  letterSpacing: '-1px',
                }}
              >
                FOOD & FAST
              </Typography>
              <Chip
                label="🚀 #1 Food Delivery"
                size="small"
                sx={{ 
                  mb: 2,
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 600
                }}
              />
            </Box>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'grey.300',
                mb: 3,
                lineHeight: 1.6
              }}
            >
              Experience the fastest food delivery service in town. Fresh ingredients, 
              expert chefs, and lightning-fast delivery - all at your fingertips.
            </Typography>

            {/* Social Media */}
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={1}>
              {[
                { icon: <FacebookIcon />, label: 'Facebook', color: '#1877F2' },
                { icon: <TwitterIcon />, label: 'Twitter', color: '#1DA1F2' },
                { icon: <InstagramIcon />, label: 'Instagram', color: '#E4405F' },
                { icon: <LinkedInIcon />, label: 'LinkedIn', color: '#0A66C2' },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  aria-label={social.label}
                  sx={{
                    bgcolor: 'grey.800',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: social.color,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 4px 12px ${social.color}40`,
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2.5}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                color: 'primary.main',
                mb: 3
              }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  sx={{
                    color: 'grey.300',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <span style={{ fontSize: '14px' }}>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Legal Links */}
          <Grid item xs={12} sm={6} md={2.5}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                color: 'primary.main',
                mb: 3
              }}
            >
              Legal
            </Typography>
            <Stack spacing={1.5}>
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  sx={{
                    color: 'grey.300',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                color: 'primary.main',
                mb: 3
              }}
            >
              Contact Us
            </Typography>
            <Stack spacing={2.5}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <LocationIcon sx={{ color: 'primary.main', mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'grey.300', fontWeight: 600 }}>
                    Our Location
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    123 Food Street, Gourmet District<br />
                    City Center, State 12345
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PhoneIcon sx={{ color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'grey.300', fontWeight: 600 }}>
                    Order Hotline
                  </Typography>
                  <Link 
                    href="tel:+1234567890"
                    sx={{ 
                      color: 'grey.400', 
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    (123) 456-7890
                  </Link>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <EmailIcon sx={{ color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'grey.300', fontWeight: 600 }}>
                    Email Support
                  </Typography>
                  <Link 
                    href="mailto:info@foodandfast.com"
                    sx={{ 
                      color: 'grey.400', 
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    info@foodandfast.com
                  </Link>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <TimeIcon sx={{ color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'grey.300', fontWeight: 600 }}>
                    Delivery Hours
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    Mon-Sun: 8:00 AM - 11:00 PM
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Divider sx={{ my: 4, bgcolor: 'grey.700' }} />
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'grey.400',
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            © {currentYear} Food & Fast. All rights reserved. Made with ❤️ for food lovers.
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ color: 'grey.400' }}>
              Available on:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip 
                label="📱 iOS" 
                size="small" 
                variant="outlined" 
                sx={{ 
                  borderColor: 'grey.600',
                  color: 'grey.300',
                  '&:hover': { borderColor: 'primary.main' }
                }}
              />
              <Chip 
                label="🤖 Android" 
                size="small" 
                variant="outlined" 
                sx={{ 
                  borderColor: 'grey.600',
                  color: 'grey.300',
                  '&:hover': { borderColor: 'primary.main' }
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;