import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
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
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useLocalization } from '../../hooks/useLocalization';
import LanguageIcon from '@mui/icons-material/Language';

// Hide header on scroll down
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);
  const notifications = useSelector((state) => state.notifications?.unread || 0);
  
  const dispatch = useDispatch();
  const theme = useTheme();
  const location = useLocation();
  const { language, setLang, t } = useLocalization();

  const pages = [
    { title: t('home'), path: '/', icon: HomeIcon },
    { title: t('products'), path: '/product', icon: ProductsIcon },
    { title: t('orders'), path: '/orders', icon: ReceiptIcon },
    { title: t('profile'), path: '/profile', icon: ProfileIcon },
  ];

  const userMenuItems = [
    { title: t('profile'), path: '/profile', icon: ProfileIcon },
    { title: t('orders'), path: '/orders', icon: ReceiptIcon },
    { title: t('settings'), path: '/settings', icon: SettingsIcon },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setAnchorElNav(null);
    setAnchorElUser(null);
  }, [location.pathname]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setSearchValue('');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // Handle search logic here
      console.log('Searching for:', searchValue);
      setSearchOpen(false);
    }
  };

  const isActivePage = (path) => {
    return location.pathname === path;
  };

  const handleLanguageChange = () => {
    const newLang = language === 'en' ? 'vn' : 'en';
    setLang(newLang);
  };

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        sx={{
          bgcolor: 'background.paper',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: theme.shadows[1],
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
              component={RouterLink}
              to="/"
              sx={{
                mr: 4,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                textDecoration: 'none',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-1px',
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
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                {anchorElNav ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>

            {/* Logo - Mobile */}
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
                letterSpacing: '-0.5px',
              }}
            >
              {t('food_and_fast')}
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {pages.map((page) => {
                const Icon = page.icon;
                const isActive = isActivePage(page.path);
                
                return (
                  <Button
                    key={page.title}
                    component={RouterLink}
                    to={page.path}
                    startIcon={<Icon />}
                    sx={{
                      py: 1.5,
                      px: 2.5,
                      borderRadius: 2,
                      color: isActive ? 'primary.main' : 'text.primary',
                      bgcolor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                      fontWeight: isActive ? 600 : 400,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: 'primary.main',
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        transform: 'translateY(-1px)',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: isActive ? '100%' : '0%',
                        height: 2,
                        bgcolor: 'primary.main',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover::after': {
                        width: '100%',
                      },
                    }}
                  >
                    {page.title}
                  </Button>
                );
              })}
            </Box>

            {/* Language Switcher */}
            <Tooltip title={language === 'en' ? 'Chuyển sang Tiếng Việt' : 'Switch to English'}>
              <IconButton
                onClick={() => setLang(language === 'en' ? 'vn' : 'en')}
                sx={{
                  mr: 1,
                  color: 'text.primary',
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                <LanguageIcon />
              </IconButton>
            </Tooltip>

            {/* Search Icon */}
            <Tooltip title={t('search')}>
              <IconButton
                onClick={handleSearchToggle}
                sx={{
                  mr: 1,
                  color: 'text.primary',
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            {isAuthenticated && (
              <Tooltip title={t('notifications')}>
                <IconButton
                  sx={{
                    mr: 1,
                    color: 'text.primary',
                    '&:hover': {
                      color: 'primary.main',
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

            {/* Cart Icon */}
            <Tooltip title={t('cart')}>
              <IconButton
                component={RouterLink}
                to="/cart"
                sx={{
                  mr: 2,
                  color: 'text.primary',
                  position: 'relative',
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <Badge 
                  badgeContent={totalQuantity} 
                  color="primary"
                  sx={{
                    '& .MuiBadge-badge': {
                      animation: totalQuantity > 0 ? 'pulse 2s infinite' : 'none',
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.2)' },
                        '100%': { transform: 'scale(1)' },
                      },
                    },
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* User Menu */}
            <Box sx={{ flexGrow: 0 }}>
              {isAuthenticated ? (
                <>
                  <Tooltip title={t('account_settings')}>
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{
                        p: 0,
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      <Avatar
                        alt={user?.name || 'User'}
                        src={user?.avatar}
                        sx={{
                          width: 44,
                          height: 44,
                          border: '2px solid',
                          borderColor: 'primary.main',
                          boxShadow: theme.shadows[2],
                        }}
                      >
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="contained"
                  startIcon={<PersonIcon />}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    boxShadow: theme.shadows[2],
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: theme.shadows[4],
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  {t('login')}
                </Button>
              )}
            </Box>

            {/* Mobile Navigation Menu */}
            <Menu
              id="mobile-menu"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  borderRadius: 3,
                  mt: 1,
                  minWidth: 250,
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              {pages.map((page) => {
                const Icon = page.icon;
                const isActive = isActivePage(page.path);
                
                return (
                  <MenuItem
                    key={page.title}
                    component={RouterLink}
                    to={page.path}
                    onClick={handleCloseNavMenu}
                    sx={{
                      py: 1.5,
                      px: 2,
                      bgcolor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                      color: isActive ? 'primary.main' : 'text.primary',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      <Icon />
                    </ListItemIcon>
                    <Typography fontWeight={isActive ? 600 : 400}>
                      {page.title}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu>

            {/* User Menu */}
            <Menu
              id="user-menu"
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{
                mt: '45px',
                '& .MuiPaper-root': {
                  borderRadius: 3,
                  minWidth: 220,
                  boxShadow: theme.shadows[8],
                },
              }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {/* User Info */}
              <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="subtitle1" fontWeight={600} noWrap>
                  {user?.name || 'User'}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {user?.email || 'user@example.com'}
                </Typography>
              </Box>

              {/* Menu Items */}
              {userMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <MenuItem
                    key={item.title}
                    component={RouterLink}
                    to={item.path}
                    onClick={handleCloseUserMenu}
                    sx={{
                      py: 1.5,
                      px: 2,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Icon fontSize="small" />
                    </ListItemIcon>
                    <Typography>{item.title}</Typography>
                  </MenuItem>
                );
              })}
              
              <Divider />
              
              <MenuItem
                onClick={handleLogout}
                sx={{
                  py: 1.5,
                  px: 2,
                  color: 'error.main',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.error.main, 0.08),
                  },
                }}
              >
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                <Typography>{t('logout')}</Typography>
              </MenuItem>
            </Menu>
          </Toolbar>

          {/* Search Bar */}
          {searchOpen && (
            <Box
              component="form"
              onSubmit={handleSearchSubmit}
              sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                bgcolor: 'background.paper',
                borderBottom: 1,
                borderColor: 'divider',
                p: 2,
                zIndex: 1000,
              }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: alpha(theme.palette.grey[500], 0.1),
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                  }}
                >
                  <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                  <input
                    type="text"
                    placeholder={t('search_products')}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    style={{
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      width: '100%',
                      fontSize: '16px',
                      color: theme.palette.text.primary,
                    }}
                    autoFocus
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ borderRadius: 2 }}
                >
                  {t('search')}
                </Button>
                <IconButton
                  onClick={handleSearchToggle}
                  sx={{ color: 'text.secondary' }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
