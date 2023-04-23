import { useState } from 'react';
import Title from '../../Atoms/Title';
import Input from '../../Atoms/Input/Input';
import {
  Container, SignUpContainer, SignInContainer, Form, Anchor, OverlayContainer,
  Overlay, LeftOverlayPanel, RightOverlayPanel, GhostButton, Paragraph,
} from './style';
import Button from 'components/Atoms/Button';
import { useAuth } from 'Context/AuthContext';

function App() {
  const [signIn, setSignIn] = useState(true);
  const [userSignIn, setUserSignIn] = useState({ username: '', password: '' });
  const [userSignUp, setUserSignUp] = useState({
    name: '', username: '', email: '', password: '',
  });

  const { login, signUp } = useAuth();

  const onChangeSignInForm = (e) => {
    const { name, value } = e.target;
    setUserSignIn((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeSignUpForm = (e) => {
    const { name, value } = e.target;
    setUserSignUp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSignIn = async (e) => {
    e.preventDefault();
    const result = await login(userSignIn.username, userSignIn.password);
    console.log(result);
  };

  const onSignUp = (e) => {
    e.preventDefault();
    signUp(userSignUp);
  };

  return (
    <Container>
      <SignUpContainer signinIn={signIn}>
        <Form id="SignUpForm">
          <Title color="primary" size={32}>Crear una cuenta</Title>
          <Input name="name" type="text" placeholder="Name" onChange={onChangeSignUpForm} />
          <Input name="username" type="text" placeholder="Username" onChange={onChangeSignUpForm} />
          <Input name="email" type="email" placeholder="Email" onChange={onChangeSignUpForm} />
          <Input name="password" type="password" placeholder="Password" onChange={onChangeSignUpForm} />
          <Button textColor="white" form="SignUpForm" type="submit" onClick={onSignUp}>Crear cuenta</Button>
        </Form>
      </SignUpContainer>

      <SignInContainer signinIn={signIn}>
        <Form id="SignInForm">
          <Title color="primary" size={32}>Inicio de sesión</Title>
          <Input name="username" type="text" placeholder="Username" onChange={onChangeSignInForm} />
          <Input name="password" type="password" placeholder="Password" onChange={onChangeSignInForm} />
          <Anchor href="#">Forgot your password?</Anchor>
          <Button textColor="white" form="SignInForm" type="submit" onClick={onSignIn}>Iniciar sesión</Button>
        </Form>
      </SignInContainer>

      <OverlayContainer signinIn={signIn}>
        <Overlay signinIn={signIn}>
          <LeftOverlayPanel signinIn={signIn}>
            <Title>Welcome Back!</Title>
            <Paragraph>
              To keep connected with us please login with your personal info
            </Paragraph>
            <GhostButton onClick={() => setSignIn(true)}>
              Sign In
            </GhostButton>
          </LeftOverlayPanel>

          <RightOverlayPanel signinIn={signIn}>
            <Title color="white" size={32}>Hello, Friend!</Title>
            <Paragraph>
              Enter Your personal details and start journey with us
            </Paragraph>
            <GhostButton onClick={() => setSignIn(false)}>
              Sigin Up
            </GhostButton>
          </RightOverlayPanel>
        </Overlay>
      </OverlayContainer>

    </Container>
  );
}

export default App;
