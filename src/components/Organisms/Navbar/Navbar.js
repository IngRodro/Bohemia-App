import MenuNavbar from '../../Molecules/MenuNavbar';
import { StyleNavbar } from './style';
import Title from '../../Atoms/Title';
import { useAuth } from 'Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Atoms/Logo';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <StyleNavbar>
      <div style={
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
        }
      }>
      <Logo></Logo>
      <Title
        color="primary"
        size={30}
        button={true}
        onClick={() => navigate('/home/restaurants')}
      >
        {'Bohemia'}
      </Title>
      </div>
      <MenuNavbar />
    </StyleNavbar>
  );
};



export default Navbar;
