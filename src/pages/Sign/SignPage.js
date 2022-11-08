import Layout from '../../components/Organisms/Layout';
import SignForm from '../../components/Organisms/SignForm';

const SignPage = () => {
  return (
    <Layout const signButton={false}>
      <SignForm/>
    </Layout>
  );
};

export default SignPage;
