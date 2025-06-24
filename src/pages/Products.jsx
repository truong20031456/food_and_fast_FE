import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  Chip,
  Rating,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Slider,
  Paper,
  useTheme,
  useMediaQuery,
  Drawer,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Sort as SortIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import axios from 'axios';

// API configuration
const API_BASE_URL = 'http://localhost:8000'; // Product service API URL

const Products = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 30]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/products/`, {
          headers: {
            'X-API-Key': 'X-Auth-Token',
          },
          params: {
            limit: 100,
            category_id: selectedCategory !== 'All' ? selectedCategory : undefined,
            min_price: priceRange[0],
            max_price: priceRange[1],
          },
        });
        setProducts(response.data.items);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, priceRange]);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/categories/`, {
          headers: {
            'X-API-Key': 'X-Auth-Token',
          },
        });
        setCategories(['All', ...response.data.map(cat => cat.name)]);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        default:
          return b.isPopular - a.isPopular;
      }
    });

  const FilterDrawer = () => (
    <Drawer
      anchor="right"
      open={isFilterDrawerOpen}
      onClose={() => setIsFilterDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          p: 3,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight={600}>Filters</Typography>
        <IconButton onClick={() => setIsFilterDrawerOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 3 }} />
      
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Categories
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => setSelectedCategory(category)}
            color={selectedCategory === category ? 'primary' : 'default'}
            sx={{
              background: selectedCategory === category
                ? 'linear-gradient(45deg, #FF4B2B 30%, #FF416C 90%)'
                : 'transparent',
              color: selectedCategory === category ? 'white' : 'inherit',
              '&:hover': {
                background: selectedCategory === category
                  ? 'linear-gradient(45deg, #FF416C 30%, #FF4B2B 90%)'
                  : 'rgba(0,0,0,0.04)',
              },
            }}
          />
        ))}
      </Stack>

      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Price Range
      </Typography>
      <Box sx={{ px: 2, mb: 3 }}>
        <Slider
          value={priceRange}
          onChange={(_, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={30}
          sx={{
            color: '#FF4B2B',
            '& .MuiSlider-thumb': {
              '&:hover, &.Mui-focusVisible': {
                boxShadow: '0 0 0 8px rgba(255, 75, 43, 0.16)',
              },
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            ${priceRange[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${priceRange[1]}
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        fullWidth
        onClick={() => setIsFilterDrawerOpen(false)}
        sx={{
          mt: 2,
          background: 'linear-gradient(45deg, #FF4B2B 30%, #FF416C 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #FF416C 30%, #FF4B2B 90%)',
          },
        }}
      >
        Apply Filters
      </Button>
    </Drawer>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              mb: 2,
              background: 'linear-gradient(45deg, #FF4B2B 30%, #FF416C 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Menu
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Discover our carefully crafted dishes made with the finest ingredients
          </Typography>
        </Box>

        {/* Search and Filter Bar */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 4,
            borderRadius: 2,
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center',
            bgcolor: 'background.paper',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          <TextField
            fullWidth
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ flex: { xs: '1 1 100%', sm: '1 1 auto' } }}
          />
          
          {!isMobile && (
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="popular">Most Popular</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
              </Select>
            </FormControl>
          )}

          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setIsFilterDrawerOpen(true)}
            sx={{
              borderColor: 'divider',
              '&:hover': {
                borderColor: 'primary.main',
                background: 'rgba(255,75,43,0.04)',
              },
            }}
          >
            Filters
          </Button>
        </Paper>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    transform: 'translateY(-8px)',
                  },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={product.images?.[0]?.image_url || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={product.name}
                    sx={{
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                  <IconButton
                    onClick={() => toggleFavorite(product.id)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(255,255,255,0.9)',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,1)',
                      },
                    }}
                  >
                    {favorites.includes(product.id) ? (
                      <FavoriteIcon sx={{ color: '#FF4B2B' }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                  {product.status === 'active' && (
                    <Chip
                      label="New"
                      color="success"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #00C853 30%, #69F0AE 90%)',
                        color: 'white',
                      }}
                    />
                  )}
                </Box>

                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <Typography variant="h6" fontWeight={700} color="primary">
                      {product.name}
                    </Typography>
                    {product.stock_quantity > 0 && (
                      <Chip
                        label="In Stock"
                        color="success"
                        size="small"
                        sx={{
                          fontWeight: 600,
                          background: 'linear-gradient(45deg, #00C853 30%, #69F0AE 90%)',
                          color: 'white',
                        }}
                      />
                    )}
                  </Stack>

                  <Typography color="text.secondary" mb={2}>
                    {product.description}
                  </Typography>

                  <Box sx={{ mt: 'auto' }}>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                      <Rating
                        value={product.reviews?.reduce((acc, review) => acc + review.rating, 0) / (product.reviews?.length || 1) || 0}
                        precision={0.1}
                        readOnly
                        size="small"
                        sx={{
                          '& .MuiRating-iconFilled': {
                            color: '#FF4B2B',
                          },
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {product.reviews?.length || 0} reviews
                      </Typography>
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          background: 'linear-gradient(45deg, #FF4B2B 30%, #FF416C 90%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        ${product.price}
                      </Typography>
                      <Button
                        variant="contained"
                        disabled={product.stock_quantity === 0}
                        sx={{
                          background: 'linear-gradient(45deg, #FF4B2B 30%, #FF416C 90%)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #FF416C 30%, #FF4B2B 90%)',
                          },
                        }}
                      >
                        {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </Button>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Filter Drawer */}
        <FilterDrawer />
      </Container>
    </Box>
  );
};

export default Products; 