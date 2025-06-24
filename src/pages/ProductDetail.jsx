import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';

const ProductDetail = () => {
  const { id } = useParams();

  // Placeholder data - replace with actual data fetching
  const product = {
    id: id,
    name: 'Delicious Food Item',
    description: 'A mouth-watering description of the food item.',
    price: 15.99,
    imageUrl: 'https://via.placeholder.com/400', // Placeholder image URL
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Adding product ${product.name} to cart`);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              alt={product.name}
              height="400"
              image={product.imageUrl}
              title={product.name}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail; 