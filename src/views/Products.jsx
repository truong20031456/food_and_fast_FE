import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  Drawer,
  Fab,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ProductList from '../components/product/ProductList';
import ProductFilter from '../components/product/ProductFilter';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';

// Products page: Hiển thị danh sách sản phẩm, filter, sort, add to cart, responsive UI
const Products = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // State cho filter UI
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  // Lấy data, loading, error, filter, action từ useProducts hook
  const {
    products,
    loading,
    error,
    filters,
    updateFilters,
    refreshProducts,
  } = useProducts();
  // Lấy action addToCart từ useCart hook
  const { addToCart } = useCart();
  // State quản lý sản phẩm yêu thích (demo, có thể lưu vào store/localStorage)
  const [favorites, setFavorites] = useState([]);

  // Callback toggle yêu thích
  const handleFavoriteToggle = (productId, isFavorite) => {
    setFavorites((prev) =>
      isFavorite ? [...prev, productId] : prev.filter((id) => id !== productId)
    );
  };

  // Lọc sản phẩm theo search/filter (nếu cần custom ngoài useProducts)
  const filteredProducts = useMemo(() => {
    // Có thể filter thêm theo favorites, v.v. nếu muốn
    return products;
  }, [products]);

  // UI filter cho mobile
  const FilterDrawer = () => (
    <Drawer
      anchor="right"
      open={isFilterDrawerOpen}
      onClose={() => setIsFilterDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <ProductFilter
          filters={filters}
          onChange={updateFilters}
          onClose={() => setIsFilterDrawerOpen(false)}
        />
      </Box>
    </Drawer>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header + Filter */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <Typography variant="h4" fontWeight={700} flex={1}>
          Products
        </Typography>
        {/* Filter button cho mobile */}
        {isMobile && (
          <Fab
            color="primary"
            size="medium"
            onClick={() => setIsFilterDrawerOpen(true)}
            sx={{ boxShadow: 3 }}
            aria-label="Open filters"
          >
            <FilterListIcon />
          </Fab>
        )}
        {/* Filter UI cho desktop */}
        {!isMobile && (
          <Box sx={{ minWidth: 320 }}>
            <ProductFilter filters={filters} onChange={updateFilters} />
          </Box>
        )}
      </Box>

      {/* Danh sách sản phẩm */}
      <ProductList
        products={filteredProducts}
        loading={loading}
        error={error}
        onFavoriteToggle={handleFavoriteToggle}
        onAddToCart={addToCart}
      />

      {/* Filter Drawer cho mobile */}
      {isMobile && <FilterDrawer />}

      {/* Refresh button demo */}
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 4 }}>
        <Button variant="outlined" onClick={refreshProducts}>
          Refresh Products
        </Button>
      </Stack>
    </Container>
  );
};

export default Products;