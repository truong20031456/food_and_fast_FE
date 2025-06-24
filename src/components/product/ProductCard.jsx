import { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
  Rating,
  Chip,
  Tooltip,
  Skeleton,
} from '@mui/material';
import {
  AddShoppingCart as AddCartIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  RemoveRedEye as ViewIcon,
} from '@mui/icons-material';
import { addToCart } from '../../store/slices/cartSlice';

const ProductCard = memo(({ product, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(product?.isFavorite || false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart({
      ...product,
      quantity: 1,
      addedAt: Date.now()
    }));
  }, [dispatch, product]);

  const handleFavorite = useCallback(() => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    onFavoriteToggle?.(product.id, newFavoriteState);
  }, [isFavorite, onFavoriteToggle, product.id]);

  const handleProductClick = useCallback(() => {
    navigate(`/products/${product.id}`);
  }, [navigate, product.id]);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoading(false);
    setImageError(true);
  }, []);

  // Tính giá gốc từ giá hiện tại và discount
  const originalPrice = product.discount > 0 
    ? product.price / (1 - product.discount / 100)
    : product.price;

  const discountAmount = originalPrice - product.price;

  if (!product) {
    return null;
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: 8,
          transform: 'translateY(-4px)',
        },
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <Chip
          label={`-${product.discount}%`}
          color="error"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 2,
            fontWeight: 'bold',
            boxShadow: 2,
          }}
        />
      )}

      {/* Favorite Button */}
      <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
        <IconButton
          onClick={handleFavorite}
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 2,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          {isFavorite ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Tooltip>

      {/* Product Image */}
      <Box sx={{ position: 'relative', height: 200 }}>
        {imageLoading && (
          <Skeleton 
            variant="rectangular" 
            width="100%" 
            height={200}
            sx={{ position: 'absolute', top: 0, left: 0 }}
          />
        )}
        <CardMedia
          component="img"
          height="200"
          image={imageError ? '/images/placeholder-product.jpg' : product.image}
          alt={product.name}
          onLoad={handleImageLoad}
          onError={handleImageError}
          sx={{
            objectFit: 'cover',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
            display: imageLoading ? 'none' : 'block',
          }}
          onClick={handleProductClick}
        />
        
        {/* Quick View Button */}
        <Tooltip title="Quick view">
          <IconButton
            onClick={handleProductClick}
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              bgcolor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              '.MuiCard-root:hover &': {
                opacity: 1,
              },
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.8)',
              },
            }}
          >
            <ViewIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Product Content */}
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            cursor: 'pointer',
            fontWeight: 600,
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            '&:hover': {
              color: 'primary.main',
            },
            transition: 'color 0.2s ease',
          }}
          onClick={handleProductClick}
        >
          {product.name}
        </Typography>

        {/* Rating và Reviews */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating 
            value={product.rating || 0} 
            readOnly 
            size="small" 
            precision={0.5}
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.reviews || 0})
          </Typography>
        </Box>

        {/* Description */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.5em',
          }}
        >
          {product.description}
        </Typography>

        {/* Price Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography 
            variant="h6" 
            color="primary" 
            sx={{ fontWeight: 700 }}
          >
            ${product.price.toFixed(2)}
          </Typography>
          {product.discount > 0 && (
            <>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                ${originalPrice.toFixed(2)}
              </Typography>
              <Typography
                variant="body2"
                color="success.main"
                sx={{ fontWeight: 600 }}
              >
                Save ${discountAmount.toFixed(2)}
              </Typography>
            </>
          )}
        </Box>

        {/* Stock Status */}
        {product.stock !== undefined && (
          <Typography 
            variant="caption" 
            color={product.stock > 0 ? "success.main" : "error.main"}
            sx={{ fontWeight: 600 }}
          >
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </Typography>
        )}
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddCartIcon />}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          sx={{
            fontWeight: 600,
            py: 1,
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: 4,
            },
            '&:disabled': {
              opacity: 0.6,
            },
          }}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardActions>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;