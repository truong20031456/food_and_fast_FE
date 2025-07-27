import { useState, useCallback, useMemo } from 'react';
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
  Stack,
  Badge,
  Fade,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Restaurant as RestaurantIcon,
  ShoppingCart as CartIcon,
  Notifications as NotificationIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const pages = [
  { title: 'Home', path: '/', icon: null },
  { title: 'Menu', path: '/menu', icon: null },
  { title: 'Blog', path: '/blog', icon: null },
  { title: 'Careers', path: '/careers', icon: null },
];

const settings = [
  { title: 'Profile', path: '/profile' },
  { title: 'Orders', path: '/orders' },
  { title: 'Settings', path: '/settings' },
  { title: 'Logout', action: 'logout' },
];

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, logoutUser } = useAuth();
  const location = useLocation();

  // Memoize handlers để tránh re-render không cần thiết
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

  const handleSettingClick = useCallback((setting) => {
    handleCloseUserMenu();
    if (setting.action === 'logout') {
      logoutUser();
    }
  }, [logoutUser, handleCloseUserMenu]);

  // Memoize active page check
  const isActivePage = useCallback((path) => {
    return location.pathname === path;
  }, [location.pathname]);

  // Memoize user avatar fallback
  const userInitial = useMemo(() => {
    return user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U';
  }, [user?.name, user?.email]);

  return (
    <AppBar 
      position="sticky" 
      elevation={2}
      sx={{ 
        backdropFilter: 'blur(10px)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 56, sm: 64 } }}>
          {/* Logo - Desktop */}
          <RestaurantIcon
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              mr: 1,
              fontSize: 28,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'rotate(10deg)',
              }
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: '"Poppins", "Roboto", sans-serif',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                textShadow: '0 0 10px rgba(255,255,255,0.8)',
              }
            }}
          >
            FOODIE
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              TransitionComponent={Fade}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  borderRadius: 2,
                  mt: 1,
                }
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page.path}
                  selected={isActivePage(page.path)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(102, 126, 234, 0.1)',
                      '&:hover': {
                        backgroundColor: 'rgba(102, 126, 234, 0.2)',
                      }
                    }
                  }}
                >
                  <Typography 
                    textAlign="center"
                    sx={{ 
                      fontWeight: isActivePage(page.path) ? 600 : 400,
                      color: isActivePage(page.path) ? 'primary.main' : 'text.primary'
                    }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <RestaurantIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: '"Poppins", "Roboto", sans-serif',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FOODIE
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  mx: 1,
                  color: 'white', 
                  display: 'block',
                  position: 'relative',
                  fontWeight: isActivePage(page.path) ? 600 : 400,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isActivePage(page.path) ? '80%' : '0%',
                    height: '2px',
                    backgroundColor: 'white',
                    transition: 'width 0.3s ease-in-out',
                  },
                  '&:hover::after': {
                    width: '80%',
                  }
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Action Icons - Cart & Notifications (when logged in) */}
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <Tooltip title="Shopping Cart">
                <IconButton 
                  color="inherit" 
                  component={RouterLink} 
                  to="/cart"
                  sx={{
                    mr: 1,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    }
                  }}
                >
                  <Badge badgeContent={3} color="secondary">
                    <CartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Notifications">
                <IconButton 
                  color="inherit"
                  sx={{
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    }
                  }}
                >
                  <Badge badgeContent={2} color="error">
                    <NotificationIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>
          )}

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton 
                    onClick={handleOpenUserMenu} 
                    sx={{ 
                      p: 0,
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                  >
                    <Avatar
                      alt={user.name || user.email}
                      src={user.avatar}
                      sx={{ 
                        bgcolor: 'secondary.main',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      {userInitial}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ 
                    mt: '45px',
                    '& .MuiPaper-root': {
                      backdropFilter: 'blur(10px)',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                      borderRadius: 2,
                      minWidth: 160,
                    }
                  }}
                  id="menu-appbar-user"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  TransitionComponent={Fade}
                >
                  {/* User Info Header */}
                  <Box sx={{ px: 2, py: 1, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {user.name || 'User'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                  
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.title}
                      onClick={() => handleSettingClick(setting)}
                      component={setting.path ? RouterLink : 'div'}
                      to={setting.path}
                      sx={{
                        transition: 'background-color 0.2s ease-in-out',
                        '&:hover': {
                          backgroundColor: setting.action === 'logout' 
                            ? 'rgba(244, 67, 54, 0.1)' 
                            : 'rgba(102, 126, 234, 0.1)',
                        }
                      }}
                    >
                      <Typography 
                        textAlign="center"
                        sx={{
                          color: setting.action === 'logout' ? 'error.main' : 'text.primary',
                          fontWeight: setting.action === 'logout' ? 600 : 400,
                        }}
                      >
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Stack direction="row" spacing={1}>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  color="inherit"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  color="secondary"
                  sx={{
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Register
                </Button>
              </Stack>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;