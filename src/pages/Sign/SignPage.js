import Layout from '../../components/Organisms/Layout';
import SignForm from '../../components/Organisms/SignForm';

const SignPage = () => {
  return (
    <Layout navbar={false}>
      <SignForm />
    </Layout>
  );
};

export default SignPage;
