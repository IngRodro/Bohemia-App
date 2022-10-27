import { Navigate, Outlet } from 'react-router-dom';

import config from 'config';
import { useAuth } from 'Context/AuthContext';

const { ROUTES } = config;

const PrivateRoute = () => {
  const { isAuthenticated, loadingAuth } = useAuth();

  if (loadingAuth) return null;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.HOME_RESTAURANTS.absolutePath} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
