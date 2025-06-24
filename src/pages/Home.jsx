import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Paper,
  Chip,
  Avatar
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {
  Restaurant,
  DeliveryDining,
  SupportAgent,
  Star,
  ArrowForward,
  PlayArrow,
  LocalDining,
  Fastfood,
  Coffee
} from '@mui/icons-material';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  background: `
    linear-gradient(135deg, 
      rgba(255, 107, 107, 0.9) 0%, 
      rgba(255, 142, 83, 0.9) 50%, 
      rgba(255, 193, 7, 0.9) 100%
    ),
    url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  color: 'white',
  padding: theme.spacing(20, 0),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  }
}));

const FloatingElements = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  pointerEvents: 'none',
  '& .floating-circle': {
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    animation: `${float} 6s ease-in-out infinite`,
  },
  '& .circle-1': {
    width: '80px',
    height: '80px',
    top: '20%',
    left: '10%',
    animationDelay: '0s',
  },
  '& .circle-2': {
    width: '120px',
    height: '120px',
    top: '60%',
    right: '10%',
    animationDelay: '2s',
  },
  '& .circle-3': {
    width: '60px',
    height: '60px',
    top: '10%',
    right: '20%',
    animationDelay: '4s',
  }
});

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  borderRadius: '20px',
  overflow: 'hidden',
  border: 'none',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  background: 'linear-gradient(145deg, #ffffff 0%, #fef7f0 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '3px',
    background: `linear-gradient(90deg, 
      transparent, 
      rgba(255, 107, 107, 0.4), 
      transparent
    )`,
    animation: `${shimmer} 2s infinite`,
  },
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(255, 107, 107, 0.15)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px',
  color: 'white',
  fontSize: '2rem',
  boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)',
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
  borderRadius: '50px',
  padding: '12px 32px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #ff5252 0%, #ff7043 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 35px rgba(255, 107, 107, 0.4)',
  },
}));

const TestimonialCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '20px',
  background: 'linear-gradient(145deg, #ffffff 0%, #fef7f0 100%)',
  border: '1px solid rgba(255, 107, 107, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 15px 35px rgba(255, 107, 107, 0.1)',
  },
}));

const AnimatedTitle = styled(Typography)(({ theme }) => ({
  animation: `${fadeInUp} 1s ease-out`,
  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
}));

const FoodCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  },
}));

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Nguyên liệu tươi ngon',
      description: 'Chúng tôi chỉ sử dụng nguyên liệu tươi ngon nhất, được chọn lọc từ các nguồn cung cấp uy tín',
      icon: <Restaurant />,
      color: '#ff6b6b',
    },
    {
      title: 'Giao hàng nhanh chóng',
      description: 'Giao hàng trong vòng 30 phút trong khu vực nội thành, đảm bảo thức ăn vẫn nóng hổi',
      icon: <DeliveryDining />,
      color: '#ff8e53',
    },
    {
      title: 'Hỗ trợ 24/7',
      description: 'Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn mọi lúc mọi nơi',
      icon: <SupportAgent />,
      color: '#ffc107',
    },
  ];

  const popularDishes = [
    {
      name: 'Phở Bò Đặc Biệt',
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop',
      price: '85.000đ',
      rating: 4.8,
      category: 'Món chính'
    },
    {
      name: 'Bánh Mì Thịt Nướng',
      image: 'https://images.unsplash.com/photo-1715925717150-2a6d181d8846?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '25.000đ',
      rating: 4.9,
      category: 'Ăn vặt'
    },
    {
      name: 'Cơm Tấm Sườn Nướng',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop',
      price: '65.000đ',
      rating: 4.7,
      category: 'Món chính'
    },
    {
      name: 'Chè Ba Màu',
      image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&h=300&fit=crop',
      price: '15.000đ',
      rating: 4.6,
      category: 'Tráng miệng'
    }
  ];

  const testimonials = [
    {
      text: "Đồ ăn ngon tuyệt vời! Giao hàng nhanh và còn nóng. Tôi đặt ăn ở đây mỗi tuần.",
      author: "Nguyễn Thị Lan",
      role: "Khách hàng thân thiết",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=150&h=150&fit=crop&crop=face"
    },
    {
      text: "Chất lượng món ăn rất tốt, giá cả hợp lý. Dịch vụ khách hàng xuất sắc!",
      author: "Trần Văn Minh",
      role: "Khách hàng VIP",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <FloatingElements>
          <div className="floating-circle circle-1" />
          <div className="floating-circle circle-2" />
          <div className="floating-circle circle-3" />
        </FloatingElements>
        
        <Container maxWidth="lg">
          <Chip 
            label="🍴 Khuyến mãi đặc biệt hôm nay" 
            sx={{ 
              mb: 3, 
              bgcolor: 'rgba(255, 255, 255, 0.2)', 
              color: 'white',
              fontWeight: 600,
              backdropFilter: 'blur(10px)'
            }} 
          />
          
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 800,
              letterSpacing: '-0.02em',
              mb: 3,
              animation: `${fadeInUp} 1s ease-out`,
            }}
          >
            Hương vị Việt Nam
            <Box component="span" sx={{ display: 'block', color: '#ffc107' }}>
              Giao tận nơi
            </Box>
          </Typography>
          
          <Typography 
            variant="h5" 
            paragraph
            sx={{
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              fontWeight: 400,
              opacity: 0.95,
              maxWidth: '600px',
              mx: 'auto',
              mb: 4,
              animation: `${fadeInUp} 1s ease-out 0.2s both`,
            }}
          >
            Thưởng thức những món ăn Việt Nam đậm đà, được chế biến từ nguyên liệu tươi ngon nhất
          </Typography>
          
          <Box sx={{ animation: `${fadeInUp} 1s ease-out 0.4s both` }}>
            <GradientButton
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate('/menu')}
              sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
            >
              Xem thực đơn
            </GradientButton>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<PlayArrow />}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.5)',
                color: 'white',
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Xem video
            </Button>
          </Box>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <Section>
        <Container>
          <Box textAlign="center" mb={8}>
            <AnimatedTitle variant="h2" component="h2" gutterBottom>
              Tại sao chọn chúng tôi?
            </AnimatedTitle>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ maxWidth: '600px', mx: 'auto' }}
            >
              Cam kết mang đến trải nghiệm ẩm thực tuyệt vời nhất cho khách hàng
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <FeatureCard>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <IconWrapper>
                      {feature.icon}
                    </IconWrapper>
                    <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Popular Dishes Section */}
      <Section sx={{ bgcolor: 'linear-gradient(135deg, #fff8f0 0%, #fef2e8 100%)' }}>
        <Container>
          <Box textAlign="center" mb={8}>
            <AnimatedTitle variant="h2" component="h2" gutterBottom>
              Món ăn được yêu thích
            </AnimatedTitle>
            <Typography variant="h6" color="text.secondary">
              Những món ăn hot nhất được khách hàng đặt nhiều nhất
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {popularDishes.map((dish, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <FoodCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={dish.image}
                    alt={dish.name}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Chip 
                      label={dish.category} 
                      size="small" 
                      sx={{ 
                        mb: 1, 
                        bgcolor: 'rgba(255, 107, 107, 0.1)', 
                        color: '#ff6b6b',
                        fontWeight: 600 
                      }} 
                    />
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                      {dish.name}
                    </Typography>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography variant="h6" color="primary" fontWeight={700}>
                        {dish.price}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Star sx={{ color: '#ffc107', fontSize: '1rem', mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary">
                          {dish.rating}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </FoodCard>
              </Grid>
            ))}
          </Grid>
          
          <Box textAlign="center" mt={6}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/menu')}
              sx={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
                borderRadius: '50px',
                px: 4
              }}
            >
              Xem tất cả món ăn
            </Button>
          </Box>
        </Container>
      </Section>

      {/* About Section */}
      <Section>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom fontWeight={700}>
                Câu chuyện của chúng tôi
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
                Bắt đầu từ một quán ăn nhỏ với niềm đam mê ẩm thực Việt Nam, chúng tôi đã không ngừng 
                phát triển để mang đến những món ăn chất lượng cao với hương vị đậm đà, truyền thống.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
                Sứ mệnh của chúng tôi là bảo tồn và phát huy những giá trị ẩm thực Việt Nam, 
                đồng thời mang đến sự tiện lợi cho khách hàng trong thời đại số.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/about')}
                sx={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
                  borderRadius: '50px',
                  mt: 2
                }}
              >
                Tìm hiểu thêm
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1226&q=80"
                alt="Về chúng tôi"
                sx={{
                  width: '100%',
                  borderRadius: '20px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  }
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Section>

      {/* Testimonials Section */}
      <Section sx={{ bgcolor: 'linear-gradient(135deg, #fff8f0 0%, #fef2e8 100%)' }}>
        <Container>
          <Box textAlign="center" mb={8}>
            <AnimatedTitle variant="h2" component="h2" gutterBottom>
              Khách hàng nói gì về chúng tôi
            </AnimatedTitle>
            <Typography variant="h6" color="text.secondary">
              Hàng nghìn khách hàng hài lòng đã tin tưởng lựa chọn
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <TestimonialCard elevation={0}>
                  <Box display="flex" mb={2}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} sx={{ color: '#ffc107', fontSize: '1.2rem' }} />
                    ))}
                  </Box>
                  <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.8 }}>
                    "{testimonial.text}"
                  </Typography>
                  <Box display="flex" alignItems="center" mt={3}>
                    <Avatar 
                      src={testimonial.avatar} 
                      sx={{ width: 50, height: 50, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {testimonial.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </TestimonialCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section sx={{ bgcolor: '#2d3748', color: 'white' }}>
        <Container>
          <Grid container spacing={6}>
            <Grid item xs={12} md={8}>
              <Typography variant="h3" component="h2" gutterBottom fontWeight={700}>
                Liên hệ với chúng tôi
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
                Hãy liên hệ ngay để được tư vấn và đặt món yêu thích của bạn
              </Typography>
              
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#ffc107' }}>
                    Thông tin liên hệ
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ opacity: 0.8 }}>
                    📧 info@monngonvietnam.com
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ opacity: 0.8 }}>
                    📞 0123 456 789
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ opacity: 0.8 }}>
                    📍 123 Đường Nguyễn Huệ, Quận 1, TP.HCM
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#ffc107' }}>
                    Thời gian phục vụ
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ opacity: 0.8 }}>
                    Thứ 2 - Thứ 6: 8:00 AM - 10:00 PM
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ opacity: 0.8 }}>
                    Thứ 7: 8:00 AM - 11:00 PM
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ opacity: 0.8 }}>
                    Chủ nhật: 9:00 AM - 10:00 PM
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  p: 4,
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Đặt món ngay
                </Typography>
                <Typography variant="body2" paragraph sx={{ opacity: 0.8 }}>
                  Đăng ký nhận thông tin khuyến mãi và món mới
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: 'linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)',
                    borderRadius: '50px',
                    py: 1.5,
                    fontWeight: 600
                  }}
                >
                  Đăng ký ngay
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Section>
    </Box>
  );
};

export default Home;