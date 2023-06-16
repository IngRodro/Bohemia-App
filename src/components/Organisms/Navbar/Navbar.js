import { useNavigate } from 'react-router-dom';
import MenuNavbar from '../../Molecules/MenuNavbar';
import { StyleNavbar, StyleLogoWrapper } from './style';
import Title from '../../Atoms/Title';
import Bohemia from '../../Atoms/Icons/Bohemia';
import { useAppTheme } from '../../../Context/themeContext';

function Navbar({ signButton }) {
  const { theme } = useAppTheme();
  const navigate = useNavigate();
  return (
    <StyleNavbar>
      <StyleLogoWrapper>
        <Bohemia
          width={300}
          height={300}
          fill={theme === 'light' ? '#000' : '#fff'}
          onClick={() => navigate('/')}
        />
        <Title
          fontFamily="Bodoni MT"
          color="#fff"
          size={56}
          button
          onClick={() => navigate('/')}
        />
      </StyleLogoWrapper>
      <MenuNavbar signButton={signButton} />
    </StyleNavbar>
  );
}

export default Navbar;
