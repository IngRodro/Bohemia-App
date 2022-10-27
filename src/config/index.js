const baseUrl = `${process.env.REACT_APP_API_URL}/v1`;

const config = {
  baseUrl,
  ROUTES: {
    HOME_RESTAURANTS: {
      path: 'home/restaurants',
      absolutePath: '/home/restaurants',
    },
    HOME_MENUS: {
      path: 'home/menus/:id',
      absolutePath: '/home/menus/:id',
    },
    RESTAURANTS: {
      path: 'restaurants',
      absolutePath: '/app/restaurants',
    },
    PRODUCTS: {
      path: 'products',
      absolutePath: '/app/products',
    },
    MENUS: {
      path: 'menus/:id',
      absolutePath: '/app/menus/:id',
    },
    LOGOUT: {
      path: 'logout',
      absolutePath: '/auth/logout',
    },
  },
};

export default config;
