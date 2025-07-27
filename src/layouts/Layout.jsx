import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import ModernNavbar from '../components/common/ModernNavbar';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ModernNavbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;