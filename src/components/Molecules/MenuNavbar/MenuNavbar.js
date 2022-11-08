import {
  StyleMenuItem,
  StyleMenuNavbar,
  StyleCloseSessionIcon,
  StyleLogInIcon,
} from './style';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from 'Context/AuthContext';

const MenuNavbar = ({signButton = true}) => {
  const { logout } = useAuth();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const closeSession = async () => {
    let timerInterval;
    await Swal.fire({
      title: 'Cerrando sesión',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
    logout();
  };

  return (
    <StyleMenuNavbar>
      {isAuthenticated ? (
        <>
          <StyleMenuItem
            color="transparent"
            labelColor="text"
            $type={'PageItem'}
            onClick={() => navigate('/app/restaurants')}
          >
            Restaurantes
          </StyleMenuItem>
          <StyleMenuItem
            color="transparent"
            labelColor="text"
            $type={'PageItem'}
            onClick={() => navigate('/app/products?page=1', { replace: true })}
          >
            Productos Generales
          </StyleMenuItem>
          <StyleMenuItem
            color="transparent"
            labelColor="text"
            $type={'ActionItem'}
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
            $type={'ActionItem'}
            onClick={() => navigate('/sign')}
          >
            Iniciar Sesión
            <StyleLogInIcon size={24} />
          </StyleMenuItem>
        )
      )}
    </StyleMenuNavbar>
  );
};

export default MenuNavbar;
