import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { setFilters, clearFilters } from '../../store/slices/productSlice';

const categories = [
  'Fast Food',
  'Pizza',
  'Burgers',
  'Sandwiches',
  'Drinks',
  'Desserts',
];

const ProductFilter = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.product);
  const [search, setSearch] = useState(filters.search);

  const handleCategoryChange = (category) => {
    dispatch(setFilters({
      category: filters.category === category ? '' : category,
    }));
  };

  const handlePriceChange = (event, newValue) => {
    dispatch(setFilters({ priceRange: newValue }));
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(setFilters({ search }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setSearch('');
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      <Box component="form" onSubmit={handleSearchSubmit} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => {
                    setSearch('');
                    dispatch(setFilters({ search: '' }));
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Categories
      </Typography>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={filters.category === category}
                onChange={() => handleCategoryChange(category)}
                size="small"
              />
            }
            label={category}
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Price Range
      </Typography>
      <Box sx={{ px: 2 }}>
        <Slider
          value={filters.priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={10}
          marks={[
            { value: 0, label: '$0' },
            { value: 500, label: '$500' },
            { value: 1000, label: '$1000' },
          ]}
        />
      </Box>

      <Button
        fullWidth
        variant="outlined"
        onClick={handleClearFilters}
        sx={{ mt: 2 }}
      >
        Clear Filters
      </Button>
    </Paper>
  );
};

export default ProductFilter; 