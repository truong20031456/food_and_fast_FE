import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  useTheme,
  alpha,
  Grid,
} from '@mui/material';
import {
  Star,
  Favorite,
  FavoriteBorder,
  LocalDining,
  Timer,
  TrendingUp,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveMenuPreview = () => {
  const theme = useTheme();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const menuItems = [
    {
      id: 1,
      name: 'Phở Bò Đặc Biệt',
      description: 'Nước dùng đậm đà, bò tái chín, bánh phở dai ngon',
      price: '85.000đ',
      image: '🍜',
      category: 'Món chính',
      rating: 4.8,
      reviews: 124,
      prepTime: '15 phút',
      spicy: false,
      popular: true,
      discount: 10,
    },
    {
      id: 2,
      name: 'Bánh Mì Thịt Nướng',
      description: 'Bánh mì giòn, thịt nướng thơm, rau sống tươi',
      price: '25.000đ',
      image: '🥖',
      category: 'Ăn vặt',
      rating: 4.6,
      reviews: 89,
      prepTime: '8 phút',
      spicy: false,
      popular: true,
      discount: 0,
    },
    {
      id: 3,
      name: 'Cơm Tấm Sườn Nướng',
      description: 'Cơm tấm dẻo, sườn nướng mật ong, bì chả',
      price: '65.000đ',
      image: '🍚',
      category: 'Món chính',
      rating: 4.7,
      reviews: 156,
      prepTime: '20 phút',
      spicy: false,
      popular: false,
      discount: 15,
    },
    {
      id: 4,
      name: 'Bún Chả Hà Nội',
      description: 'Bún tươi, chả nướng than hoa, nước mắm pha',
      price: '55.000đ',
      image: '🍝',
      category: 'Món chính',
      rating: 4.9,
      reviews: 203,
      prepTime: '12 phút',
      spicy: true,
      popular: true,
      discount: 0,
    },
    {
      id: 5,
      name: 'Chè Ba Màu',
      description: 'Chè đậu xanh, bánh lọt, nước cốt dừa',
      price: '15.000đ',
      image: '🍧',
      category: 'Tráng miệng',
      rating: 4.5,
      reviews: 67,
      prepTime: '5 phút',
      spicy: false,
      popular: false,
      discount: 0,
    },
    {
      id: 6,
      name: 'Gỏi Cuốn Tôm Thịt',
      description: 'Bánh tráng, tôm thịt, rau sống, nước mắm',
      price: '35.000đ',
      image: '🥬',
      category: 'Khai vị',
      rating: 4.4,
      reviews: 78,
      prepTime: '10 phút',
      spicy: false,
      popular: false,
      discount: 20,
    },
  ];

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box
      sx={{
        py: 8,
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.8)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              🍽️ Thực Đơn Nổi Bật
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Khám phá những món ăn được yêu thích nhất với hương vị đậm đà truyền thống
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={3}>
            {menuItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  onHoverStart={() => setHoveredItem(item.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      position: 'relative',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: hoveredItem === item.id ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: hoveredItem === item.id 
                        ? '0 20px 40px rgba(0, 0, 0, 0.15)' 
                        : '0 8px 25px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {/* Discount Badge */}
                    {item.discount > 0 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          left: 16,
                          zIndex: 2,
                        }}
                      >
                        <Chip
                          label={`-${item.discount}%`}
                          size="small"
                          sx={{
                            bgcolor: theme.palette.error.main,
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                          }}
                        />
                      </Box>
                    )}

                    {/* Popular Badge */}
                    {item.popular && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          zIndex: 2,
                        }}
                      >
                        <Chip
                          icon={<TrendingUp />}
                          label="Hot"
                          size="small"
                          sx={{
                            bgcolor: theme.palette.warning.main,
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                          }}
                        />
                      </Box>
                    )}

                    {/* Favorite Button */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: item.popular ? 80 : 16,
                        zIndex: 2,
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          onClick={() => toggleFavorite(item.id)}
                          sx={{
                            minWidth: 'auto',
                            p: 1,
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '50%',
                            '&:hover': {
                              bgcolor: 'rgba(255, 255, 255, 1)',
                            },
                          }}
                        >
                          {favorites.has(item.id) ? (
                            <Favorite sx={{ color: theme.palette.error.main }} />
                          ) : (
                            <FavoriteBorder sx={{ color: theme.palette.grey[600] }} />
                          )}
                        </Button>
                      </motion.div>
                    </Box>

                    {/* Food Image */}
                    <CardMedia
                      component="div"
                      sx={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '4rem',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        },
                      }}
                    >
                      <motion.div
                        animate={{
                          rotate: hoveredItem === item.id ? [0, 5, -5, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.image}
                      </motion.div>
                    </CardMedia>

                    <CardContent sx={{ p: 3 }}>
                      {/* Category */}
                      <Chip
                        label={item.category}
                        size="small"
                        sx={{
                          mb: 2,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                        }}
                      />

                      {/* Title */}
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          lineHeight: 1.3,
                        }}
                      >
                        {item.name}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          lineHeight: 1.5,
                          height: 40,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {item.description}
                      </Typography>

                      {/* Rating and Reviews */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Star sx={{ color: theme.palette.warning.main, fontSize: 18 }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, ml: 0.5 }}>
                          {item.rating}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                          ({item.reviews} đánh giá)
                        </Typography>
                      </Box>

                      {/* Prep Time */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Timer fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                          {item.prepTime}
                        </Typography>
                        {item.spicy && (
                          <Chip
                            label="Cay"
                            size="small"
                            sx={{
                              ml: 1,
                              bgcolor: alpha(theme.palette.error.main, 0.1),
                              color: theme.palette.error.main,
                              fontSize: '0.7rem',
                            }}
                          />
                        )}
                      </Box>

                      {/* Price and Action */}
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          {item.discount > 0 && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                textDecoration: 'line-through',
                                fontSize: '0.875rem',
                              }}
                            >
                              {item.price}
                            </Typography>
                          )}
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: theme.palette.primary.main,
                            }}
                          >
                            {item.discount > 0 
                              ? `${(parseInt(item.price.replace(/\D/g, '')) * (100 - item.discount) / 100).toLocaleString()}đ`
                              : item.price
                            }
                          </Typography>
                        </Box>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<LocalDining />}
                            sx={{
                              borderRadius: 2,
                              textTransform: 'none',
                              fontWeight: 600,
                            }}
                          >
                            Đặt ngay
                          </Button>
                        </motion.div>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              }}
            >
              Xem toàn bộ thực đơn
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default InteractiveMenuPreview; 