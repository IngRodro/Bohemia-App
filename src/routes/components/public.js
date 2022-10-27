import { Navigate, Outlet } from 'react-router-dom';

import config from 'config';
import { useAuth } from 'Context/AuthContext';

const { ROUTES } = config;

const PublicRoute = () => {
  const { isAuthenticated, loadingAuth } = useAuth();

  if (loadingAuth) return null;

  if (isAuthenticated) {
    return <Navigate to={ROUTES.RESTAURANTS.absolutePath} />;
  }

  return <Outlet />;
};

export default PublicRoute;
