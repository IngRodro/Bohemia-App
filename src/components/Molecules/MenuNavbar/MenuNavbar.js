import {
  StyleMenuItem,
  StyleMenuNavbar,
  StyleCloseSessionIcon,
  StyleLogInIcon,
} from './style';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from 'Context/AuthContext';

const MenuNavbar = () => {
  const { logout } = useAuth();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const closeSession = async () => {
    let timerInterval;
    await Swal.fire({
      title: 'Closing session',
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
            onClick={() => navigate('/app/products?page=1', { replace: true })}
          >
            Products
          </StyleMenuItem>
          <StyleMenuItem
            color="transparent"
            labelColor="text"
            $type={'PageItem'}
            onClick={() => navigate('/app/restaurants')}
          >
            Restaurants
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
        <StyleMenuItem
          color="transparent"
          labelColor="text"
          $type={'ActionItem'}
          onClick={() => navigate('/sign')}
        >
          Sign In
          <StyleLogInIcon size={24} />
        </StyleMenuItem>
      )}
    </StyleMenuNavbar>
  );
};

export default MenuNavbar;
