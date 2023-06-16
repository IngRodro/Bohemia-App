import { Container } from 'react-grid-system';
import { Helmet } from 'react-helmet';
import SignContainer from './style';

import Navbar from 'components/Organisms/Navbar';

const Layout = ({ children, title = 'Bohemia', SignPage = false }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <header>
        <Navbar />
      </header>
      <main>
        <Container>
          {SignPage ? <SignContainer>{children}</SignContainer> : <Container>{children}</Container>}
        </Container>
      </main>
    </>
  );
};

export default Layout;
