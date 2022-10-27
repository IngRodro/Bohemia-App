import { useAuth } from 'Context/AuthContext';
import { useEffect } from 'react';

function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return null;
}

export default Logout;
