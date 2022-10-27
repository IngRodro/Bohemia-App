import { Container } from 'react-grid-system';

import Navbar from 'components/Organisms/Navbar';

const Layout = ({ children, navbar = true }) => {
  return (
    <div className="App">
      {navbar && <Navbar />}
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
