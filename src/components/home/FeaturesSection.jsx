import React from 'react';
import { Container, Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { AnimatedTitle, FeatureCard, IconWrapper, fadeInUp, containerVariants, itemVariants } from './HomeStyles.jsx';

const FeaturesSection = ({ t, features }) => (
  <Box component="section">
    <Container>
      <Box textAlign="center" mb={8}>
        <AnimatedTitle 
          variant="h2" 
          component="h2" 
          gutterBottom
          data-text={t('home_why_choose_title')}
        >
          {t('home_why_choose_title')}
        </AnimatedTitle>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto', animation: `${fadeInUp} 1s ease-out 0.3s both` }}
        >
          {t('home_why_choose_description')}
        </Typography>
      </Box>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard
                variants={itemVariants}
                whileHover={{ y: -15, transition: { type: "spring", stiffness: 300 } }}
              >
                <Card className="card-inner">
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <IconWrapper
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      {feature.icon}
                    </IconWrapper>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      fontWeight={600}
                      sx={{ color: feature.color }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  </Box>
);

export default FeaturesSection; 