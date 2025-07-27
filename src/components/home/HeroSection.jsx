import React, { useRef } from 'react';
import { Box, Container, Typography, Chip, Button } from '@mui/material';
import { ArrowForward, PlayArrow } from '@mui/icons-material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GradientButton, HeroSection as StyledHeroSection, FloatingElements, Particles, GlobalParticleStyles, pulse } from './HomeStyles.jsx';

const HeroSection = ({ t, navigate }) => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <StyledHeroSection ref={heroRef}>
      <Particles />
      <FloatingElements>
        <div className="floating-circle circle-1" />
        <div className="floating-circle circle-2" />
        <div className="floating-circle circle-3" />
        <div className="floating-circle circle-4" />
      </FloatingElements>
      <motion.div style={{ y: heroY, opacity: heroOpacity }}>
        <Container maxWidth="lg">
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <Chip 
              label={t('home_special_offer_label')} 
              sx={{ mb: 3, bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white', fontWeight: 600, backdropFilter: 'blur(10px)', animation: `${pulse} 2s ease-in-out infinite` }} 
            />
          </motion.div>
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, type: "spring", stiffness: 100 }}>
            <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 800, letterSpacing: '-0.02em', mb: 3, textShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' }}>
              {t('home_title_1')}
              <Box component="span" sx={{ display: 'block', color: '#ffc107' }}>{t('home_title_2')}</Box>
            </Typography>
          </motion.div>
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <Typography variant="h5" paragraph sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' }, fontWeight: 400, opacity: 0.95, maxWidth: '600px', mx: 'auto', mb: 4, textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }}>
              {t('home_description')}
            </Typography>
          </motion.div>
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <GradientButton component={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} variant="contained" size="large" endIcon={<ArrowForward />} onClick={() => navigate('/menu')} sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}>
              {t('home_menu_button')}
            </GradientButton>
            <Button component={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} variant="outlined" size="large" startIcon={<PlayArrow />} sx={{ borderColor: 'rgba(255, 255, 255, 0.5)', color: 'white', borderRadius: '50px', backdropFilter: 'blur(10px)', borderWidth: 2, '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 2 } }}>
              {t('home_video_button')}
            </Button>
          </motion.div>
        </Container>
      </motion.div>
    </StyledHeroSection>
  );
};

export default HeroSection; 