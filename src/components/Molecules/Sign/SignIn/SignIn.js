import Swal from 'sweetalert2';
import React, { useContext, useState } from 'react';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  MutedLink,
  SubmitButton,
} from '../style';
import Input from 'components/Atoms/Input';
import { useAuth } from 'Context/AuthContext';
import { SignContext } from 'Context/signContext';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const { ChangeSignForm } = useContext(SignContext);
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const onChangeUserName = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      await Swal.fire({
        title: 'You are already logged in',
        text: 'Please logout first',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } else {
      if (Username === '' || Password === '') {
        await Swal.fire({
          title: 'Error',
          text: 'Please fill all the fields',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      } else {
        await login(Username, Password);
      }
    }
  };
  return (
    <BoxContainer $padding={70}>
      <FormContainer onSubmit={handleSubmit}>
        <Input type="text" placeholder="Username" onChange={onChangeUserName} />
        <Input
          type="password"
          placeholder="Password"
          onChange={onChangePassword}
        />
        <SubmitButton type="submit">SignIn</SubmitButton>
      </FormContainer>

      <MutedLink href="#">
        Don't have an account?{' '}
        <BoldLink href="#" onClick={ChangeSignForm}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};

export default SignInForm;
