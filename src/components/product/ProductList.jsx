import { Grid } from '@mui/material';
import ProductCard from './ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const ProductList = ({ products, loading, error, onFavoriteToggle }) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!products?.length) return <ErrorMessage message="No products found" />;

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} onFavoriteToggle={onFavoriteToggle} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList; 