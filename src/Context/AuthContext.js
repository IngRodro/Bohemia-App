import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useMutation from 'hooks/useMutation';
import Cookies from 'universal-cookie';
import config from '../config';
const { ROUTES } = config;

const defaultValue = {
  isAuthenticated: false,
  token: null,
  loading: false,
  loadingAuth: false,
  logout: () => {},
  login: async (_email, _password) => {
  },
  signUp: (_data) => new Promise(() => {}),
};

const AuthContext = createContext(defaultValue);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [token, setToken] = useState(null);

  const [
    SignIn,
  ] = useMutation('/users/login/', {
    method: 'post',
  });

  const [
    SignUp,
  ] = useMutation('/users/', {
    method: 'post',
  });

  const persisUser = useCallback((token) => {
    const cookies = new Cookies();
    cookies.set('token', token, { path: '/', maxAge: 86400 });
  }, []);

  const login = useCallback(
    async (username, password) => {
      setLoading(true);
      const { headers, errors } = await SignIn({ variables: { username, password } });
      setLoading(false);
      if (headers) {
        persisUser(headers['auth-token']);
        setToken(headers['auth-token']);
      }
      return errors;
    },
    [persisUser, SignIn]
  );

  const signUp = useCallback(
    async (payload) => {
      setLoading(true);
      const { errors } = await SignUp({ variables: payload });
      setLoading(false);
      if (errors) {
        return errors;
      }
      return;
    },
    [SignUp]
  );

  const logout = useCallback(() => {
    const cookies = new Cookies();
    cookies.remove('token', { path: '/' });
    setToken(null);
    window.location.assign(ROUTES.HOME_RESTAURANTS.absolutePath);
  }, []);

  useEffect(() => {
    const cookies = new Cookies();
    setLoadingAuth(true);
    const data = cookies.get('token');
    if (data) setToken(data);
    setLoadingAuth(false);
  }, []);

  const out = useMemo(() => {
    return {
      token,
      login,
      signUp,
      loading,
      logout,
      loadingAuth,
      isAuthenticated: !!token,
    };
  }, [token, loading, login, signUp, loadingAuth, logout]);

  return <AuthContext.Provider value={out}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
