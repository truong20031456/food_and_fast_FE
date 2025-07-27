import React from 'react';
import { Container, Box, Typography, Grid, Card, CardMedia, CardContent, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { AnimatedTitle, FoodCard, pulse, scaleVariants, containerVariants } from './HomeStyles.jsx';
import products from '../product/productsData';

const PopularDishesSection = ({ t, navigate }) => {
  const popularDishes = products.filter(p => p.isPopular);
  return (
    <Box component="section" sx={{ background: 'linear-gradient(180deg, #fff8f0 0%, #ffffff 100%)' }}>
      <Container>
        <Box textAlign="center" mb={8}>
          <AnimatedTitle 
            variant="h2" 
            component="h2" 
            gutterBottom
            data-text={t('home_popular_dishes_title')}
          >
            {t('home_popular_dishes_title')}
          </AnimatedTitle>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ animation: `${pulse} 1s ease-out 0.3s both` }}
          >
            {t('home_popular_dishes_description')}
          </Typography>
        </Box>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Grid container spacing={4}>
            {popularDishes.map((dish, index) => (
              <Grid item xs={12} sm={6} md={3} key={dish.id}>
                <FoodCard
                  variants={scaleVariants}
                  whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
                >
                  <Card className="card-inner">
                    <CardMedia
                      component="img"
                      height="200"
                      image={dish.image}
                      alt={dish.name}
                      className="card-media"
                    />
                    <CardContent sx={{ p: 3 }}>
                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Chip 
                          label={dish.category} 
                          size="small" 
                          sx={{ mb: 1, bgcolor: 'rgba(255, 107, 107, 0.1)', color: '#ff6b6b', fontWeight: 600, animation: `${pulse} 3s ease-in-out infinite` }} 
                        />
                      </motion.div>
                      <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                        {dish.name}
                      </Typography>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" color="primary" fontWeight={700}>
                          {dish.price.toLocaleString()}₫
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <span role="img" aria-label="star" style={{ color: '#ffc107', fontSize: '1rem', marginRight: 4 }}>★</span>
                          <Typography variant="body2" color="text.secondary">
                            {dish.rating}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </FoodCard>
              </Grid>
            ))}
          </Grid>
        </motion.div>
        <Box textAlign="center" mt={6}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/menu')}
              sx={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
                borderRadius: '50px',
                px: 5,
                py: 2,
                fontSize: '1.1rem',
                boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)',
                '&:hover': { boxShadow: '0 15px 40px rgba(255, 107, 107, 0.4)' }
              }}
            >
              {t('home_view_all_dishes_button')}
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default PopularDishesSection; 