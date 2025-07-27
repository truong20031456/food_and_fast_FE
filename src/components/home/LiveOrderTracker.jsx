import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  LocalShipping,
  Restaurant,
  LocationOn,
  AccessTime,
  TrendingUp,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const LiveOrderTracker = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock data for live orders
  const mockOrders = [
    {
      id: 1,
      customerName: 'Nguyễn Văn A',
      order: 'Phở Bò + Bánh Mì',
      location: 'Quận 1, TP.HCM',
      time: '2 phút trước',
      status: 'preparing',
      avatar: 'A',
      distance: '0.8km',
    },
    {
      id: 2,
      customerName: 'Trần Thị B',
      order: 'Cơm Tấm + Canh',
      location: 'Quận 3, TP.HCM',
      time: '5 phút trước',
      status: 'delivering',
      avatar: 'B',
      distance: '1.2km',
    },
    {
      id: 3,
      customerName: 'Lê Văn C',
      order: 'Bún Chả + Nước Mía',
      location: 'Quận 7, TP.HCM',
      time: '8 phút trước',
      status: 'delivering',
      avatar: 'C',
      distance: '2.1km',
    },
    {
      id: 4,
      customerName: 'Phạm Thị D',
      order: 'Bánh Cuốn + Trà Đá',
      location: 'Quận 2, TP.HCM',
      time: '12 phút trước',
      status: 'preparing',
      avatar: 'D',
      distance: '1.8km',
    },
  ];

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      // Randomly update order statuses
      setOrders(prevOrders => 
        prevOrders.map(order => ({
          ...order,
          time: `${Math.floor(Math.random() * 15) + 1} phút trước`,
          distance: `${(Math.random() * 3 + 0.5).toFixed(1)}km`,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setOrders(mockOrders);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'preparing':
        return theme.palette.warning.main;
      case 'delivering':
        return theme.palette.info.main;
      case 'delivered':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'preparing':
        return 'Đang chuẩn bị';
      case 'delivering':
        return 'Đang giao';
      case 'delivered':
        return 'Đã giao';
      default:
        return 'Chờ xử lý';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'preparing':
        return <Restaurant fontSize="small" />;
      case 'delivering':
        return <LocalShipping fontSize="small" />;
      case 'delivered':
        return <TrendingUp fontSize="small" />;
      default:
        return <AccessTime fontSize="small" />;
    }
  };

  return (
    <Box
      sx={{
        py: 8,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
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
              🚚 Đơn Hàng Đang Giao
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Theo dõi các đơn hàng đang được chuẩn bị và giao đến khách hàng
            </Typography>
          </Box>
        </motion.div>

        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
          <AnimatePresence>
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    minWidth: 280,
                    maxWidth: 320,
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
                      background: `linear-gradient(90deg, ${getStatusColor(order.status)}, ${alpha(getStatusColor(order.status), 0.6)})`,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: getStatusColor(order.status),
                        mr: 2,
                        width: 48,
                        height: 48,
                        fontSize: '1.2rem',
                        fontWeight: 600,
                      }}
                    >
                      {order.avatar}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {order.customerName}
                      </Typography>
                      <Chip
                        icon={getStatusIcon(order.status)}
                        label={getStatusText(order.status)}
                        size="small"
                        sx={{
                          bgcolor: alpha(getStatusColor(order.status), 0.1),
                          color: getStatusColor(order.status),
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                      {order.order}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {order.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTime fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {order.time} • {order.distance}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      pt: 2,
                      borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Order #{order.id.toString().padStart(4, '0')}
                    </Typography>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: getStatusColor(order.status),
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                          '0%': {
                            boxShadow: `0 0 0 0 ${alpha(getStatusColor(order.status), 0.7)}`,
                          },
                          '70%': {
                            boxShadow: `0 0 0 10px ${alpha(getStatusColor(order.status), 0)}`,
                          },
                          '100%': {
                            boxShadow: `0 0 0 0 ${alpha(getStatusColor(order.status), 0)}`,
                          },
                        },
                      }}
                    />
                  </Box>
                </Paper>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Cập nhật theo thời gian thực • {currentTime.toLocaleTimeString('vi-VN')}
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LiveOrderTracker; 