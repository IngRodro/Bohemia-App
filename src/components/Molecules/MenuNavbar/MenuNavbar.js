import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import ToggleSwitch from '../../Atoms/ToggleSwitch/TogleSwitch';
import {
  StyleMenuItem,
  StyleMenuNavbar,
  StyleCloseSessionIcon,
  StyleLogInIcon,
} from './style';

function MenuNavbar({ signButton = true }) {
  const { logout } = useAuth();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const closeSession = async () => {
    logout();
  };

  return (
    <StyleMenuNavbar>
      <ToggleSwitch />
      {isAuthenticated ? (
        <>
          <StyleMenuItem
            color="transparent"
            labelColor="text"
            $type="PageItem"
            onClick={() => navigate('/app/restaurants')}
          >
            Restaurantes
          </StyleMenuItem>
          <StyleMenuItem
            color="transparent"
            labelColor="text"
            $type="PageItem"
            onClick={() => navigate('/app/products?page=1', { replace: true })}
          >
            Productos Generales
          </StyleMenuItem>
          <StyleMenuItem
            color="transparent"
            labelColor="text"
            $type="ActionItem"
            $colorSvgHover="error"
            onClick={closeSession}
          >
            <StyleCloseSessionIcon size={24} />
          </StyleMenuItem>
        </>
      ) : (
        signButton && (
          <StyleMenuItem
            color="transparent"
            labelColor="text"
            $type="ActionItem"
            $colorSvgHover="success"
            onClick={() => navigate('/sign')}
          >
            Log In
            <StyleLogInIcon size={24} />
          </StyleMenuItem>
        )
      )}
    </StyleMenuNavbar>
  );
}

export default MenuNavbar;
