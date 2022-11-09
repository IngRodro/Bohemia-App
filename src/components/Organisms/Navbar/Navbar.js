import MenuNavbar from '../../Molecules/MenuNavbar';
import { StyleNavbar } from './style';
import Title from '../../Atoms/Title';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Atoms/Logo';

const Navbar = ({signButton}) => {
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
        fontFamily="Bodoni MT"
        color="#fff"
        size={56}
        button={true}
        onClick={() => navigate('/home/restaurants')}
      >
        {'Bohemia'}
      </Title>
      </div>
      <MenuNavbar signButton={signButton}/>
    </StyleNavbar>
  );
};



export default Navbar;
