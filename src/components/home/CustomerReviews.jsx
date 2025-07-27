import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Paper,
  Rating,
  useTheme,
  alpha,
  IconButton,
} from '@mui/material';
import {
  Star,
  FormatQuote,
  ArrowBack,
  ArrowForward,
  Verified,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const CustomerReviews = () => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const reviews = [
    {
      id: 1,
      name: 'Nguyễn Thị Lan',
      avatar: 'L',
      rating: 5,
      review: 'Đồ ăn ngon tuyệt vời! Giao hàng nhanh và còn nóng. Tôi đặt ăn ở đây mỗi tuần. Phở bò đặc biệt thật sự rất ngon, nước dùng đậm đà, bánh phở dai ngon. Nhân viên phục vụ rất thân thiện và nhiệt tình.',
      location: 'Quận 1, TP.HCM',
      orderCount: 15,
      verified: true,
      date: '2 ngày trước',
    },
    {
      id: 2,
      name: 'Trần Văn Minh',
      avatar: 'M',
      rating: 5,
      review: 'Chất lượng món ăn rất tốt, giá cả hợp lý. Dịch vụ khách hàng xuất sắc! Bánh mì thịt nướng giòn ngon, thịt nướng thơm phức. Giao hàng đúng giờ và thức ăn vẫn nóng hổi.',
      location: 'Quận 3, TP.HCM',
      orderCount: 8,
      verified: true,
      date: '1 tuần trước',
    },
    {
      id: 3,
      name: 'Lê Thị Hương',
      avatar: 'H',
      rating: 4,
      review: 'Cơm tấm sườn nướng rất ngon, sườn nướng mật ong thơm lừng. Giao hàng nhanh chóng trong vòng 30 phút. Giá cả phải chăng, phù hợp với chất lượng. Sẽ tiếp tục ủng hộ!',
      location: 'Quận 7, TP.HCM',
      orderCount: 12,
      verified: true,
      date: '3 ngày trước',
    },
    {
      id: 4,
      name: 'Phạm Văn Dũng',
      avatar: 'D',
      rating: 5,
      review: 'Bún chả Hà Nội chính gốc! Chả nướng than hoa thơm ngon, nước mắm pha đúng vị. Nhân viên giao hàng rất lịch sự và cẩn thận. Đóng gói thức ăn rất đẹp và an toàn.',
      location: 'Quận 2, TP.HCM',
      orderCount: 6,
      verified: true,
      date: '5 ngày trước',
    },
    {
      id: 5,
      name: 'Hoàng Thị Mai',
      avatar: 'M',
      rating: 5,
      review: 'Chè ba màu ngon lắm! Nước cốt dừa béo ngậy, bánh lọt dai ngon. Giao hàng nhanh và đúng giờ. Giá cả rất hợp lý cho một món tráng miệng chất lượng như vậy.',
      location: 'Quận 10, TP.HCM',
      orderCount: 20,
      verified: true,
      date: '1 ngày trước',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    if (newDirection > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  return (
    <Box
      sx={{
        py: 8,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
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
              ⭐ Khách Hàng Nói Gì
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Những đánh giá chân thực từ khách hàng đã sử dụng dịch vụ của chúng tôi
            </Typography>
          </Box>
        </motion.div>

        <Box sx={{ position: 'relative', maxWidth: 800, mx: 'auto' }}>
          {/* Navigation Buttons */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: -60,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              zIndex: 2,
              '&:hover': {
                bgcolor: 'white',
                transform: 'translateY(-50%) scale(1.1)',
              },
              '@media (max-width: 768px)': {
                left: -40,
              },
            }}
          >
            <ArrowBack />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: -60,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              zIndex: 2,
              '&:hover': {
                bgcolor: 'white',
                transform: 'translateY(-50%) scale(1.1)',
              },
              '@media (max-width: 768px)': {
                right: -40,
              },
            }}
          >
            <ArrowForward />
          </IconButton>

          {/* Review Carousel */}
          <Box sx={{ position: 'relative', height: 400, overflow: 'hidden' }}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Quote Icon */}
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FormatQuote
                          sx={{
                            fontSize: 48,
                            color: alpha(theme.palette.primary.main, 0.3),
                          }}
                        />
                      </motion.div>
                    </Box>

                    {/* Review Content */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '1.1rem',
                          lineHeight: 1.8,
                          mb: 3,
                          fontStyle: 'italic',
                          color: 'text.primary',
                          textAlign: 'center',
                        }}
                      >
                        "{reviews[currentIndex].review}"
                      </Typography>

                      {/* Rating */}
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <Rating
                          value={reviews[currentIndex].rating}
                          readOnly
                          size="large"
                          sx={{
                            '& .MuiRating-iconFilled': {
                              color: theme.palette.warning.main,
                            },
                          }}
                        />
                      </Box>

                      {/* Customer Info */}
                      <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                          <Avatar
                            sx={{
                              width: 60,
                              height: 60,
                              bgcolor: theme.palette.primary.main,
                              fontSize: '1.5rem',
                              fontWeight: 600,
                              mr: 2,
                            }}
                          >
                            {reviews[currentIndex].avatar}
                          </Avatar>
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {reviews[currentIndex].name}
                              </Typography>
                              {reviews[currentIndex].verified && (
                                <Verified
                                  sx={{
                                    color: theme.palette.success.main,
                                    fontSize: 20,
                                  }}
                                />
                              )}
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {reviews[currentIndex].location}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            {reviews[currentIndex].orderCount} đơn hàng
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            •
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {reviews[currentIndex].date}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </AnimatePresence>
          </Box>

          {/* Dots Indicator */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
            {reviews.map((_, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                <Box
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: index === currentIndex 
                      ? theme.palette.primary.main 
                      : alpha(theme.palette.primary.main, 0.3),
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: theme.palette.primary.main,
                    },
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6, mt: 6, flexWrap: 'wrap' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                4.8
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Điểm đánh giá trung bình
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                2,500+
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Khách hàng hài lòng
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                98%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Khách hàng quay lại
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CustomerReviews; 