import React, { useRef } from 'react';
import { keyframes } from '@emotion/react';
import { Box, Container, Typography, Grid, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Restaurant, DeliveryDining, SupportAgent } from '@mui/icons-material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocalization } from '../hooks/useLocalization';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import PopularDishesSection from '../components/home/PopularDishesSection';
import AboutSection from '../components/home/AboutSection';
import LiveOrderTracker from '../components/home/LiveOrderTracker';
import InteractiveMenuPreview from '../components/home/InteractiveMenuPreview';
import CustomerReviews from '../components/home/CustomerReviews';
import { styled } from '@mui/material/styles';
import Star from '@mui/icons-material/Star';
import { GlobalParticleStyles } from '../components/home/HomeStyles.jsx';
import Avatar from '@mui/material/Avatar';

// Enhanced Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(5deg);
  }
  50% {
    transform: translateY(0px) rotate(0deg);
  }
  75% {
    transform: translateY(-10px) rotate(-5deg);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const rotateIn = keyframes`
  from {
    opacity: 0;
    transform: rotate(-180deg) scale(0.5);
  }
  to {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Enhanced Styled Components
const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  position: 'relative',
  overflow: 'hidden',
}));

const FeatureCard = styled(motion.div)(({ theme }) => ({
  height: '100%',
  '& .card-inner': {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '24px',
    overflow: 'hidden',
    border: 'none',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(145deg, #ffffff 0%, #fef7f0 100%)',
    position: 'relative',
    cursor: 'pointer',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(135deg, 
        transparent 0%, 
        rgba(255, 107, 107, 0.05) 50%, 
        transparent 100%
      )`,
      opacity: 0,
      transition: 'opacity 0.5s ease',
    },
    '&:hover': {
      transform: 'translateY(-15px) scale(1.03)',
      boxShadow: '0 25px 60px rgba(255, 107, 107, 0.2)',
      '&::before': {
        opacity: 1,
      },
    },
  }
}));

const IconWrapper = styled(motion.div)(({ theme }) => ({
  width: '90px',
  height: '90px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px',
  color: 'white',
  fontSize: '2.5rem',
  boxShadow: '0 10px 30px rgba(255, 107, 107, 0.4)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
    filter: 'blur(20px)',
    opacity: 0.5,
    zIndex: -1,
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
  borderRadius: '50px',
  padding: '14px 36px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover': {
    background: 'linear-gradient(135deg, #ff5252 0%, #ff7043 100%)',
    transform: 'translateY(-3px) scale(1.05)',
    boxShadow: '0 15px 40px rgba(255, 107, 107, 0.4)',
    '&::before': {
      left: '100%',
    },
  },
}));

const TestimonialCard = styled(motion.div)(({ theme }) => ({
  '& .paper-inner': {
    padding: theme.spacing(4),
    borderRadius: '24px',
    background: 'linear-gradient(145deg, #ffffff 0%, #fef7f0 100%)',
    border: '2px solid transparent',
    backgroundClip: 'padding-box',
    position: 'relative',
    transition: 'all 0.4s ease',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '24px',
      background: 'linear-gradient(135deg, #ff6b6b, #ffc107)',
      margin: '-2px',
      opacity: 0,
      transition: 'opacity 0.4s ease',
      zIndex: -1,
    },
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 50px rgba(255, 107, 107, 0.15)',
      '&::before': {
        opacity: 1,
      },
    },
  }
}));

const AnimatedTitle = styled(Typography)(({ theme }) => ({
  animation: `${fadeInScale} 1.2s ease-out`,
  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 50%, #ffc107 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
  position: 'relative',
  '&::after': {
    content: 'attr(data-text)',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -1,
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 50%, #ffc107 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'blur(10px)',
    opacity: 0.5,
  }
}));

const FoodCard = styled(motion.div)(({ theme }) => ({
  '& .card-inner': {
    borderRadius: '24px',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.7) 100%)',
      opacity: 0,
      transition: 'opacity 0.4s ease',
      zIndex: 1,
    },
    '&:hover': {
      transform: 'translateY(-12px) scale(1.02)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
      '&::before': {
        opacity: 1,
      },
      '& .card-media': {
        transform: 'scale(1.1)',
      },
    },
  },
  '& .card-media': {
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  }
}));

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const scaleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

// Floating animation keyframe
const floatUpKeyframes = keyframes`
  to {
    bottom: 100%;
    opacity: 0;
  }
`;

const Home = () => {
  const { t, language } = useLocalization();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const features = [
    {
      title: t('home_feature_1_title'),
      description: t('home_feature_1_desc'),
      icon: <Restaurant />, color: '#ff6b6b',
    },
    {
      title: t('home_feature_2_title'),
      description: t('home_feature_2_desc'),
      icon: <DeliveryDining />, color: '#ff8e53',
    },
    {
      title: t('home_feature_3_title'),
      description: t('home_feature_3_desc'),
      icon: <SupportAgent />, color: '#ffc107',
    },
  ];

  const popularDishes = [
    {
      name: t('home_dish_1_name'),
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop',
      price: t('home_dish_1_price'),
      rating: 4.8,
      category: t('home_dish_1_category')
    },
    {
      name: t('home_dish_2_name'),
      image: 'https://images.unsplash.com/photo-1715925717150-2a6d181d8846?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: t('home_dish_2_price'),
      rating: 4.9,
      category: t('home_dish_2_category')
    },
    {
      name: t('home_dish_3_name'),
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop',
      price: t('home_dish_3_price'),
      rating: 4.7,
      category: t('home_dish_3_category')
    },
    {
      name: t('home_dish_4_name'),
      image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&h=300&fit=crop',
      price: t('home_dish_4_price'),
      rating: 4.6,
      category: t('home_dish_4_category')
    }
  ];

  const testimonials = [
    {
      text: t('home_testimonial_1_text'),
      author: t('home_testimonial_1_author'),
      role: t('home_testimonial_1_role'),
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=150&h=150&fit=crop&crop=face"
    },
    {
      text: t('home_testimonial_2_text'),
      author: t('home_testimonial_2_author'),
      role: t('home_testimonial_2_role'),
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
  ];

  return (
    <Box>
      {GlobalParticleStyles()}
      {/* Hero Section */}
      <HeroSection t={t} navigate={navigate} />

      {/* Features Section */}
      <FeaturesSection t={t} features={features} />

      {/* Popular Dishes Section */}
      <PopularDishesSection t={t} navigate={navigate} />

      {/* About Section */}
      <AboutSection t={t} navigate={navigate} />

      {/* Live Order Tracker */}
      <LiveOrderTracker />

      {/* Interactive Menu Preview */}
      <InteractiveMenuPreview />

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* Testimonials Section */}
      <Section sx={{ background: 'linear-gradient(180deg, #fff8f0 0%, #ffffff 100%)' }}>
        <Container>
          <Box textAlign="center" mb={8}>
            <AnimatedTitle 
              variant="h2" 
              component="h2" 
              gutterBottom
              data-text={t('home_testimonials_title')}
            >
              {t('home_testimonials_title')}
            </AnimatedTitle>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ animation: `${fadeInUp} 1s ease-out 0.3s both` }}
            >
              {t('home_testimonials_description')}
            </Typography>
          </Box>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <TestimonialCard
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <Paper className="paper-inner" elevation={0}>
                      <Box display="flex" mb={2}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star sx={{ color: '#ffc107', fontSize: '1.2rem' }} />
                          </motion.div>
                        ))}
                      </Box>
                      <Typography 
                        variant="body1" 
                        paragraph 
                        sx={{ 
                          fontSize: '1.1rem', 
                          fontStyle: 'italic', 
                          lineHeight: 1.8,
                          position: 'relative',
                          '&::before': {
                            content: '"""',
                            position: 'absolute',
                            top: -10,
                            left: -10,
                            fontSize: '3rem',
                            color: '#ff6b6b',
                            opacity: 0.2,
                          }
                        }}
                      >
                        {testimonial.text}
                      </Typography>
                      <Box display="flex" alignItems="center" mt={3}>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Avatar 
                            src={testimonial.avatar} 
                            sx={{ 
                              width: 60, 
                              height: 60, 
                              mr: 2,
                              border: '3px solid #ff6b6b',
                              boxShadow: '0 5px 20px rgba(255, 107, 107, 0.3)'
                            }}
                          />
                        </motion.div>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {testimonial.author}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </TestimonialCard>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section sx={{ bgcolor: '#2d3748', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 50%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 193, 7, 0.1) 0%, transparent 50%)
            `,
          }}
        />
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Typography 
                  variant="h3" 
                  component="h2" 
                  gutterBottom 
                  fontWeight={700}
                  sx={{ animation: `${slideInLeft} 1s ease-out` }}
                >
                  {t('home_contact_title')}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    opacity: 0.9, 
                    mb: 4,
                    animation: `${fadeInUp} 1s ease-out 0.3s both`
                  }}
                >
                  {t('home_contact_description')}
                </Typography>
                
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Typography variant="h6" gutterBottom sx={{ color: '#ffc107' }}>
                        {t('home_contact_info_title')}
                      </Typography>
                      <Typography variant="body1" paragraph sx={{ opacity: 0.8 }}>
                        {t('home_contact_email')}
                      </Typography>
                      <Typography variant="body1" paragraph sx={{ opacity: 0.8 }}>
                        {t('home_contact_phone')}
                      </Typography>
                      <Typography variant="body1" paragraph sx={{ opacity: 0.8 }}>
                        {t('home_contact_address')}
                      </Typography>
                    </motion.div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <Typography variant="h6" gutterBottom sx={{ color: '#ffc107' }}>
                        {t('home_contact_hours_title')}
                      </Typography>
                      <Typography variant="body1" paragraph sx={{ opacity: 0.8 }}>
                        {t('home_contact_hours_mon_fri')}
                      </Typography>
                      <Typography variant="body1" paragraph sx={{ opacity: 0.8 }}>
                        {t('home_contact_hours_sat')}
                      </Typography>
                      <Typography variant="body1" paragraph sx={{ opacity: 0.8 }}>
                        {t('home_contact_hours_sun')}
                      </Typography>
                    </motion.div>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '30px',
                    p: 4,
                    border: '2px solid rgba(255, 193, 7, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '-50%',
                      right: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'radial-gradient(circle, rgba(255, 193, 7, 0.1) 0%, transparent 70%)',
                      animation: `${pulse} 4s ease-in-out infinite`,
                    }
                  }}
                >
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    {t('home_subscribe_title')}
                  </Typography>
                  <Typography variant="body2" paragraph sx={{ opacity: 0.8 }}>
                    {t('home_subscribe_description')}
                  </Typography>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        background: 'linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)',
                        borderRadius: '50px',
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        boxShadow: '0 10px 30px rgba(255, 193, 7, 0.4)',
                        '&:hover': {
                          boxShadow: '0 15px 40px rgba(255, 193, 7, 0.5)',
                        }
                      }}
                    >
                      {t('home_subscribe_button')}
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Section>
    </Box>
  );
};

export default Home;