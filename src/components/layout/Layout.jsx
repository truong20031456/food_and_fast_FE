import React, { useState, useCallback, useMemo } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Badge,
  InputBase,
  Divider,
  ListItemIcon,
  useMediaQuery,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  Home as HomeIcon,
  Store as StoreIcon,
  Article as BlogIcon,
  Work as CareersIcon,
  ShoppingBag as OrdersIcon,
} from '@mui/icons-material';
import { styled, alpha, useTheme } from '@mui/material/styles';

// Mock useAuth hook since it might not exist
const useAuth = () => {
  return {
    user: null, // Set to null or mock user data
    logout: () => Promise.resolve(),
    cartItemsCount: 0,
  };
};

// Styled components with better responsive design
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 6,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    border: `1px solid ${alpha(theme.palette.common.white, 0.3)}`,
  },
  '&:focus-within': {
    backgroundColor: alpha(theme.palette.common.white, 0.3),
    border: `1px solid ${alpha(theme.palette.common.white, 0.4)}`,
    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
  },
  marginRight: theme.spacing(1),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    minWidth: '250px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: alpha(theme.palette.common.white, 0.8),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    fontSize: '0.95rem',
    '&::placeholder': {
      color: alpha(theme.palette.common.white, 0.7),
      opacity: 1,
    },
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
}));

const NavContainer = styled(Container)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  borderRadius: theme.spacing(6),
  margin: theme.spacing(2, 'auto'),
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  margin: theme.spacing(0.5, 0.5),
  color: 'white',
  fontWeight: 600,
  padding: theme.spacing(1, 2.5),
  borderRadius: theme.spacing(3),
  textTransform: 'none',
  fontSize: '0.95rem',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  ...(active && {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  }),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.common.white, 0.2)}, transparent)`,
    transition: 'left 0.5s',
  },
  '&:hover:before': {
    left: '100%',
  },
}));

const Logo = styled('img')({
  width: 40,
  height: 40,
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05) rotate(5deg)',
  },
});

const Layout = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, cartItemsCount = 0 } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Memoized navigation items with icons
  const navigationItems = useMemo(() => [
    { text: 'Home', path: '/', icon: <HomeIcon fontSize="small" /> },
    { text: 'Products', path: '/products', icon: <StoreIcon fontSize="small" /> },
    { text: 'Blog', path: '/blog', icon: <BlogIcon fontSize="small" /> },
    { text: 'Careers', path: '/careers', icon: <CareersIcon fontSize="small" /> },
  ], []);

  // Optimized event handlers with useCallback
  const handleOpenUserMenu = useCallback((event) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleOpenMobileMenu = useCallback((event) => {
    setMobileMenuAnchor(event.currentTarget);
  }, []);

  const handleCloseMobileMenu = useCallback(() => {
    setMobileMenuAnchor(null);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      // Clear any stored authentication data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('authToken');
      
      navigate('/login');
      handleCloseUserMenu();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [logout, navigate, handleCloseUserMenu]);

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      handleCloseMobileMenu();
    }
  }, [searchQuery, navigate, handleCloseMobileMenu]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const handleNavigation = useCallback((path, closeMobile = false) => {
    navigate(path);
    if (closeMobile) {
      handleCloseMobileMenu();
    }
  }, [navigate, handleCloseMobileMenu]);

  // Check if current path is active
  const isActiveRoute = useCallback((path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  }, [location.pathname]);

  // Memoized user menu items (moved after handleLogout definition)
  const userMenuItems = useMemo(() => [
    { text: 'Profile', icon: <PersonIcon fontSize="small" />, path: '/profile' },
    { text: 'Orders', icon: <OrdersIcon fontSize="small" />, path: '/orders' },
    { text: 'Logout', icon: <LogoutIcon fontSize="small" />, onClick: handleLogout },
  ], [handleLogout]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <StyledAppBar>
        <NavContainer maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1 }}>
            {/* Logo/Brand */}
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05) rotate(5deg)',
                  },
                }}
              >
                F&F
              </Box>
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  ml: 1.5,
                  fontWeight: 800,
                  color: 'white',
                  textDecoration: 'none',
                  letterSpacing: 1.5,
                  fontSize: '1.4rem',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  '&:hover': {
                    textShadow: '0 4px 8px rgba(0,0,0,0.4)',
                  },
                }}
              >
                FOOD & FAST
              </Typography>
            </Box>

            {/* Mobile menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="open navigation menu"
                onClick={handleOpenMobileMenu}
                sx={{ 
                  color: 'white',
                  '&:hover': { backgroundColor: alpha('#fff', 0.1) }
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleCloseMobileMenu}
                sx={{ mt: 1 }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              >
                {/* Mobile Search */}
                <MenuItem sx={{ px: 3, py: 2 }}>
                  <Search sx={{ mr: 0, background: alpha(theme.palette.primary.main, 0.1) }}>
                    <SearchIconWrapper>
                      <SearchIcon sx={{ color: theme.palette.primary.main }} />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      sx={{ color: theme.palette.text.primary }}
                    />
                  </Search>
                </MenuItem>
                <Divider />
                
                {/* Navigation Items */}
                {navigationItems.map((item) => (
                  <MenuItem
                    key={item.text}
                    onClick={() => handleNavigation(item.path, true)}
                    sx={{ 
                      py: 1.5,
                      backgroundColor: isActiveRoute(item.path) ? alpha(theme.palette.primary.main, 0.1) : 'transparent'
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {item.icon}
                    </ListItemIcon>
                    <Typography>{item.text}</Typography>
                  </MenuItem>
                ))}
                
                <Divider />
                
                {/* User Menu Items */}
                {user && userMenuItems.map((item) => (
                  <MenuItem
                    key={item.text}
                    onClick={() => {
                      handleCloseMobileMenu();
                      if (item.onClick) {
                        item.onClick();
                      } else {
                        navigate(item.path);
                      }
                    }}
                    sx={{ py: 1.5 }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {item.icon}
                    </ListItemIcon>
                    <Typography>{item.text}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Mobile logo */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.2rem',
                textAlign: 'center',
              }}
            >
              FOOD & FAST
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flexGrow: 1, ml: 3 }}>
              {navigationItems.map((item) => (
                <NavButton
                  key={item.text}
                  component={Link}
                  to={item.path}
                  active={isActiveRoute(item.path)}
                  startIcon={item.icon}
                >
                  {item.text}
                </NavButton>
              ))}
            </Box>

            {/* Search bar for desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </Search>
            </Box>

            {/* User Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title="Shopping Cart">
                <IconButton 
                  color="inherit" 
                  onClick={() => navigate('/cart')}
                  sx={{
                    '&:hover': { 
                      backgroundColor: alpha('#fff', 0.1),
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Badge 
                    badgeContent={cartItemsCount} 
                    sx={{ 
                      '& .MuiBadge-badge': { 
                        backgroundColor: '#ff4444', 
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                      } 
                    }}
                  >
                    <CartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              {user ? (
                <Tooltip title="Account settings">
                  <IconButton 
                    onClick={handleOpenUserMenu} 
                    sx={{ 
                      p: 0,
                      '&:hover': { transform: 'scale(1.05)' },
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.2)', 
                        color: 'white',
                        border: '2px solid rgba(255,255,255,0.3)',
                        fontWeight: 'bold',
                      }}
                    >
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.3)',
                    borderRadius: '25px',
                    px: 3,
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Login
                </Button>
              )}

              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                sx={{ mt: 1 }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {userMenuItems.map((item, index) => (
                  <React.Fragment key={item.text}>
                    {index === userMenuItems.length - 1 && <Divider />}
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        if (item.onClick) {
                          item.onClick();
                        } else {
                          navigate(item.path);
                        }
                      }}
                      sx={{ py: 1.5, minWidth: 150 }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {item.icon}
                      </ListItemIcon>
                      <Typography>{item.text}</Typography>
                    </MenuItem>
                  </React.Fragment>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </NavContainer>
      </StyledAppBar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>

      {/* Enhanced Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 4, 
          px: 2, 
          mt: 'auto', 
          background: `linear-gradient(135deg, ${theme.palette.grey[100]} 0%, ${theme.palette.grey[200]} 100%)`,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="xl">
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
            sx={{ fontWeight: 500 }}
          >
            {'© '}
            {new Date().getFullYear()}
            {' '}
            <Link 
              color="inherit" 
              href="#"
              sx={{ 
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Food & Fast
            </Link>
            {' - Delivering happiness, one meal at a time.'}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;