import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: 'The Art of Food Presentation',
    excerpt: 'Learn how to make your dishes look as good as they taste with these professional plating techniques.',
    image: '/images/blog/food-presentation.jpg',
    category: 'Culinary Tips',
    date: 'March 15, 2024',
    author: 'Chef John Smith',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Sustainable Cooking Practices',
    excerpt: 'Discover eco-friendly cooking methods and how to reduce food waste in your kitchen.',
    image: '/images/blog/sustainable-cooking.jpg',
    category: 'Sustainability',
    date: 'March 12, 2024',
    author: 'Sarah Johnson',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: 'The Rise of Plant-Based Cuisine',
    excerpt: 'Exploring the growing trend of plant-based cooking and its impact on modern gastronomy.',
    image: '/images/blog/plant-based.jpg',
    category: 'Food Trends',
    date: 'March 10, 2024',
    author: 'Michael Brown',
    readTime: '6 min read',
  },
  {
    id: 4,
    title: 'Essential Kitchen Tools for Home Chefs',
    excerpt: 'A comprehensive guide to must-have kitchen equipment for aspiring home cooks.',
    image: '/images/blog/kitchen-tools.jpg',
    category: 'Equipment',
    date: 'March 8, 2024',
    author: 'Emily Davis',
    readTime: '8 min read',
  },
];

const categories = [
  'All',
  'Culinary Tips',
  'Sustainability',
  'Food Trends',
  'Equipment',
  'Recipes',
  'Industry News',
];

const Blog = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Food Blog
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}
          >
            Discover the latest trends, tips, and insights from the culinary world
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search articles..."
            sx={{
              maxWidth: 600,
              mx: 'auto',
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'background.paper',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Categories */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            mb: 6,
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
          }}
        >
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              clickable
              sx={{
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                },
              }}
            />
          ))}
        </Stack>

        {/* Blog Posts Grid */}
        <Grid container spacing={4}>
          {blogPosts.map((post) => (
            <Grid item xs={12} md={6} key={post.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={post.image}
                  alt={post.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip
                    label={post.category}
                    size="small"
                    color="primary"
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="h5" component="h2" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {post.excerpt}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mb: 2 }}
                    alignItems="center"
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {post.date}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PersonIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {post.author}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {post.readTime}
                    </Typography>
                  </Stack>
                  <Button
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 500,
                    }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Newsletter Section */}
        <Box
          sx={{
            mt: 8,
            p: 4,
            borderRadius: 4,
            bgcolor: 'primary.main',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Subscribe to Our Newsletter
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Get the latest articles and updates delivered to your inbox
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            <TextField
              fullWidth
              placeholder="Enter your email"
              variant="outlined"
              sx={{
                bgcolor: 'white',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { border: 'none' },
                },
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ px: 4, borderRadius: 2 }}
            >
              Subscribe
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Blog; 