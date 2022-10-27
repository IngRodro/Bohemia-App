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
import Swal from 'sweetalert2';
const { ROUTES } = config;

const defaultValue = {
  isAuthenticated: false,
  token: null,
  loading: false,
  loadingAuth: false,
  logout: () => {},
  login: (_email, _password) => {
    console.log(_email, _password);
  },
  signUp: (_data) => new Promise(() => {}),
};

const AuthContext = createContext(defaultValue);

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [token, setToken] = useState(null);

  const [
    SignIn,
    { loading: loadingSignIn, data: _dataSign, errors: errorsSignIn },
  ] = useMutation('/users/login/', {
    method: 'post',
  });

  const [
    SignUp,
    { loading: loadingSignUp, data: dataSignUp, errors: errorsSignUp },
  ] = useMutation('/users/', {
    method: 'post',
  });

  const persisUser = useCallback((token) => {
    cookies.set('token', token, { path: '/', maxAge: 86400 });
  }, []);

  const login = useCallback(
    async (username, password) => {
      setLoading(true);
      const { headers } = await SignIn({ variables: { username, password } });
      setLoading(false);
      if (headers) {
        persisUser(headers['auth-token']);
        setToken(headers['auth-token']);
      }
    },
    [persisUser]
  );

  const signUp = useCallback(
    async (payload) => {
      setLoading(true);
      await SignUp({ variables: payload });

      setLoading(false);
      if (dataSignUp) {
        persisUser(dataSignUp);
        setToken(dataSignUp);
      }
    },
    [persisUser]
  );

  const logout = useCallback(() => {
    cookies.remove('token', { path: '/' });
    setToken(null);
    window.location.assign(ROUTES.HOME_RESTAURANTS.absolutePath);
  }, []);

  useEffect(() => {
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
