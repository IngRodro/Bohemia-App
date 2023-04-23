import Layout from '../../components/Organisms/Layout';
import SignForm from '../../components/Organisms/SignForm';

const SignPage = () => {
  return (
    <Layout const signButton={false} title="Sign" SignPage={true} >
      <SignForm />
    </Layout>
  );
};

export default SignPage;
