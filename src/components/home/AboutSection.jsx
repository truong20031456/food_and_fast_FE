import React from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { fadeInUp, AnimatedTitle } from './HomeStyles.jsx';

const AboutSection = ({ t, navigate }) => (
  <Box component="section">
    <Container>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AnimatedTitle 
              variant="h3" 
              component="h2" 
              gutterBottom 
              data-text={t('home_about_story_title')}
              sx={{ animation: 'none' }}
            >
              {t('home_about_story_title')}
            </AnimatedTitle>
            <Typography 
              variant="body1" 
              paragraph 
              sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary', animation: `${fadeInUp} 1s ease-out 0.3s both` }}
            >
              {t('home_about_story_description_1')}
            </Typography>
            <Typography 
              variant="body1" 
              paragraph 
              sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary', animation: `${fadeInUp} 1s ease-out 0.5s both` }}
            >
              {t('home_about_story_description_2')}
            </Typography>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/about')}
                sx={{ background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)', borderRadius: '50px', mt: 2, animation: `${fadeInUp} 1s ease-out 0.7s both` }}
              >
                {t('home_learn_more_button')}
              </Button>
            </motion.div>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box
              component={motion.img}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1226&q=80"
              alt={t('home_about_image_alt')}
              sx={{ width: '100%', borderRadius: '30px', boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)' }}
            />
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default AboutSection; 