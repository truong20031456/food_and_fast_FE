import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Layout from './layouts/Layout';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Profile from './views/Profile';
import Blog from './views/Blog';
import Careers from './views/Careers';
import Products from './views/Products';
import NotFound from './views/NotFound';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="products" element={<Products />} />
      <Route path="blog" element={<Blog />} />
      <Route path="careers" element={<Careers />} />
      <Route
        path="profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
   
    </Route>
  </Routes>
);

export default AppRoutes; 