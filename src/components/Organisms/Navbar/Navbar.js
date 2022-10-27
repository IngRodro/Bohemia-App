import MenuNavbar from '../../Molecules/MenuNavbar';
import { StyleNavbar } from './style';
import Title from '../../Atoms/Title';
import { useAuth } from 'Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <StyleNavbar>
      <Title
        color="primary"
        size={30}
        button={true}
        onClick={() => navigate('/home/restaurants')}
      >
        {'Bohemia'}
      </Title>
      <MenuNavbar />
    </StyleNavbar>
  );
};

export default Navbar;
