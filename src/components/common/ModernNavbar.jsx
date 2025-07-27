import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useLocalization } from '../../hooks/useLocalization';
import './ModernNavbar.css';
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
  useTheme,
  Slide,
  useScrollTrigger,
  Divider,
  ListItemIcon,
  Chip,
  alpha,
  Fade,
  Grow,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Receipt as ReceiptIcon,
  AccountCircle as ProfileIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
  Inventory as ProductsIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Close as CloseIcon,
  Language as LanguageIcon,
  Restaurant as RestaurantIcon,
  LocalShipping as DeliveryIcon,
  Favorite as FavoriteIcon,
  Support as SupportIcon,
} from '@mui/icons-material';

// Hide header on scroll down
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const ModernNavbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);
  const notifications = useSelector((state) => state.notifications?.unread || 0);
  
  const dispatch = useDispatch();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLang, t } = useLocalization();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pages = [
    { title: t('home'), path: '/', icon: HomeIcon },
    { title: t('products'), path: '/products', icon: ProductsIcon },
    { title: t('delivery'), path: '/delivery', icon: DeliveryIcon },
    { title: t('support'), path: '/support', icon: SupportIcon },
  ];

  const userMenuItems = [
    { title: t('profile'), path: '/profile', icon: ProfileIcon },
    { title: t('orders'), path: '/orders', icon: ReceiptIcon },
    { title: t('favorites'), path: '/favorites', icon: FavoriteIcon },
    { title: t('settings'), path: '/settings', icon: SettingsIcon },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setAnchorElNav(null);
    setAnchorElUser(null);
  }, [location.pathname]);

  const handleOpenNavMenu = useCallback((event) => {
    setAnchorElNav(event.currentTarget);
  }, []);

  const handleOpenUserMenu = useCallback((event) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    handleCloseUserMenu();
    navigate('/login');
  }, [dispatch, handleCloseUserMenu, navigate]);

  const handleSearchToggle = useCallback(() => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setSearchValue('');
    }
  }, [searchOpen]);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setSearchValue('');
    }
  }, [searchValue, navigate]);

  const isActivePage = useCallback((path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  }, [location.pathname]);

  const handleLanguageChange = useCallback(() => {
    const newLang = language === 'en' ? 'vn' : 'en';
    setLang(newLang);
  }, [language, setLang]);

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 
                     user?.email?.charAt(0)?.toUpperCase() || 'U';

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        className={scrolled ? 'navbar-scrolled' : 'navbar-gradient'}
        sx={{
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar 
            disableGutters 
            sx={{ 
              minHeight: { xs: 64, md: 72 },
              transition: 'all 0.3s ease',
            }}
          >
            {/* Logo - Desktop */}
            <Box
              component={Link}
              to="/"
              className="navbar-logo"
              sx={{
                mr: 4,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <RestaurantIcon 
                sx={{ 
                  fontSize: 32, 
                  color: scrolled ? 'primary.main' : 'white',
                  mr: 1,
                  transition: 'all 0.3s ease',
                }} 
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: scrolled ? 'primary.main' : 'white',
                  letterSpacing: '-1px',
                  transition: 'all 0.3s ease',
                }}
              >
                {t('food_and_fast')}
              </Typography>
              <Chip
                label={t('new')}
                size="small"
                color="primary"
                sx={{
                  ml: 1,
                  height: 20,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  bgcolor: scrolled ? 'primary.main' : 'white',
                  color: scrolled ? 'white' : 'primary.main',
                  transition: 'all 0.3s ease',
                }}
              />
            </Box>

            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleOpenNavMenu}
                sx={{
                  color: scrolled ? 'text.primary' : 'white',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                {anchorElNav ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>

            {/* Logo - Mobile */}
            <Box
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <RestaurantIcon 
                sx={{ 
                  fontSize: 28, 
                  color: scrolled ? 'primary.main' : 'white',
                  mr: 1,
                  transition: 'all 0.3s ease',
                }} 
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: scrolled ? 'primary.main' : 'white',
                  letterSpacing: '-0.5px',
                  transition: 'all 0.3s ease',
                }}
              >
                {t('food_and_fast')}
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {pages.map((page) => {
                const Icon = page.icon;
                const isActive = isActivePage(page.path);
                
                return (
                  <Button
                    key={page.title}
                    component={Link}
                    to={page.path}
                    startIcon={<Icon />}
                    className="navbar-button"
                    sx={{
                      py: 1.5,
                      px: 2.5,
                      borderRadius: 2,
                      color: scrolled ? (isActive ? 'primary.main' : 'text.primary') : 'white',
                      bgcolor: scrolled ? (isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent') : 
                               (isActive ? alpha(theme.palette.common.white, 0.2) : 'transparent'),
                      fontWeight: isActive ? 600 : 400,
                      position: 'relative',
                      overflow: 'hidden',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: isActive ? '80%' : '0%',
                        height: '2px',
                        bgcolor: scrolled ? 'primary.main' : 'white',
                        transition: 'width 0.3s ease',
                      },
                    }}
                  >
                    {page.title}
                  </Button>
                );
              })}
            </Box>

            {/* Right side actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Search */}
              <Tooltip title={t('search')}>
                <IconButton
                  onClick={handleSearchToggle}
                  sx={{
                    color: scrolled ? 'text.primary' : 'white',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>

              {/* Language Toggle */}
              <Tooltip title={t('change_language')}>
                <IconButton
                  onClick={handleLanguageChange}
                  sx={{
                    color: scrolled ? 'text.primary' : 'white',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                >
                  <LanguageIcon />
                </IconButton>
              </Tooltip>

              {/* Cart */}
              {isAuthenticated && (
                <Tooltip title={t('cart')}>
                  <IconButton
                    component={Link}
                    to="/cart"
                    sx={{
                      color: scrolled ? 'text.primary' : 'white',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    <Badge badgeContent={totalQuantity || 0} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}

              {/* Notifications */}
              {isAuthenticated && (
                <Tooltip title={t('notifications')}>
                  <IconButton
                    sx={{
                      color: scrolled ? 'text.primary' : 'white',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    <Badge badgeContent={notifications} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}

              {/* User Menu */}
              {isAuthenticated ? (
                <Box>
                  <Tooltip title={t('account_settings')}>
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{
                        color: scrolled ? 'text.primary' : 'white',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                        },
                      }}
                    >
                      <Avatar
                        className="navbar-avatar"
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: scrolled ? 'primary.main' : 'white',
                          color: scrolled ? 'white' : 'primary.main',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                        }}
                      >
                        {userInitial}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    TransitionComponent={Grow}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    className="navbar-menu"
                    sx={{
                      '& .MuiPaper-root': {
                        borderRadius: 2,
                        mt: 1,
                      }
                    }}
                  >
                    {userMenuItems.map((item) => (
                      <MenuItem
                        key={item.title}
                        onClick={handleCloseUserMenu}
                        component={item.path ? Link : 'div'}
                        to={item.path}
                        className="navbar-menu-item"
                        sx={{
                          py: 1.5,
                          px: 2,
                        }}
                      >
                        <ListItemIcon>
                          <item.icon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="body2">{item.title}</Typography>
                      </MenuItem>
                    ))}
                    <Divider />
                    <MenuItem
                      onClick={handleLogout}
                      sx={{
                        py: 1.5,
                        px: 2,
                        color: 'error.main',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.error.main, 0.1),
                        }
                      }}
                    >
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" color="error" />
                      </ListItemIcon>
                      <Typography variant="body2">{t('logout')}</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    sx={{
                      color: scrolled ? 'primary.main' : 'white',
                      borderColor: scrolled ? 'primary.main' : 'white',
                      '&:hover': {
                        bgcolor: scrolled ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.common.white, 0.1),
                        borderColor: scrolled ? 'primary.dark' : 'white',
                      },
                    }}
                  >
                    {t('login')}
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    sx={{
                      bgcolor: scrolled ? 'primary.main' : 'white',
                      color: scrolled ? 'white' : 'primary.main',
                      '&:hover': {
                        bgcolor: scrolled ? 'primary.dark' : alpha(theme.palette.common.white, 0.9),
                      },
                    }}
                  >
                    {t('register')}
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>

        {/* Mobile menu */}
        <Menu
          anchorEl={anchorElNav}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          TransitionComponent={Fade}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          className="navbar-menu"
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiPaper-root': {
              borderRadius: 2,
              mt: 1,
              width: '100%',
              maxWidth: '100vw',
            }
          }}
        >
          <Container>
            {pages.map((page) => {
              const Icon = page.icon;
              const isActive = isActivePage(page.path);
              
              return (
                <MenuItem
                  key={page.title}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  selected={isActive}
                  sx={{
                    py: 2,
                    px: 3,
                    borderRadius: 1,
                    mb: 0.5,
                    '&.Mui-selected': {
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                      }
                    },
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    }
                  }}
                >
                  <ListItemIcon>
                    <Icon color={isActive ? 'primary' : 'inherit'} />
                  </ListItemIcon>
                  <Typography 
                    variant="body1"
                    sx={{ 
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'primary.main' : 'text.primary'
                    }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              );
            })}
            
            {isAuthenticated && (
              <>
                <Divider sx={{ my: 2 }} />
                <MenuItem
                  component={Link}
                  to="/cart"
                  onClick={handleCloseNavMenu}
                  sx={{ py: 2, px: 3 }}
                >
                  <ListItemIcon>
                    <Badge badgeContent={totalQuantity || 0} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </ListItemIcon>
                  <Typography variant="body1">{t('cart')}</Typography>
                </MenuItem>
              </>
            )}
          </Container>
        </Menu>
      </AppBar>
    </HideOnScroll>
  );
};

export default ModernNavbar; 