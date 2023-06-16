import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import ToggleSwitch from '../../Atoms/ToggleSwitch/TogleSwitch';
import {
  StyleMenuItem,
  StyleMenuNavbar,
  StyleCloseSessionIcon,
  StyleLogInIcon,
} from './style';
import swal from 'sweetalert2';

function MenuNavbar({ signButton = true }) {
  const { logout } = useAuth();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const closeSession = async () => {
    swal
      .fire({
        title: '¿Estás seguro?',
        text: '¿Quieres cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      })
      .then((result) => {
        if (result.isConfirmed) {
          swal.fire({
            title: 'Cerrando sesión',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              swal.showLoading();
            },
          }).then((result) => {
            if (result.dismiss === swal.DismissReason.timer) {
              logout();
            }
            else {
              swal.fire('Cancelado', 'El cierre de sesión ha sido cancelado', 'error');
            }
          });
        }
      });
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
