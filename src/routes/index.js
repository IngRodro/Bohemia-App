import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';

import config from 'config';
import { AuthProvider } from 'Context/AuthContext';
import PublicRoute from './components/public';
import PrivateRoute from './components/private';
import Restaurants from 'pages/Restaurants/Restaurants';
import Products from 'pages/Products/Products';
import Menus from 'pages/Menus/Menus';
import Logout from 'pages/Logout/Logout';
import RestaurantsHome from '../pages/Home/RestaurantsHome';
import MenusHome from '../pages/Home/MenusHome';
import SignPage from '../pages/Sign/SignPage';

const { ROUTES } = config;

const Routes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ReactRoutes>
          <Route path="/" element={<PublicRoute/>}>
            <Route
              index
              path={ROUTES.HOME_RESTAURANTS.path}
              element={<RestaurantsHome />}
            />
            <Route path={ROUTES.HOME_MENUS.path} element={<MenusHome />} />
            <Route path="Sign" element={<SignPage />} />
          </Route>
          <Route path="/app" element={<PrivateRoute />}>
            <Route
              index
              path={ROUTES.RESTAURANTS.path}
              element={<Restaurants />}
            />
            <Route path={ROUTES.PRODUCTS.path} element={<Products />} />
            <Route path={ROUTES.MENUS.path} element={<Menus />} />
          </Route>
          <Route path="/auth" element={<PrivateRoute />}>
            <Route path={ROUTES.LOGOUT.path} element={<Logout />} />
          </Route>
        </ReactRoutes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Routes;
