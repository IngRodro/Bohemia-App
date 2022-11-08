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

const SignInForm = () => {
  const { isAuthenticated, login } = useAuth();
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
        const result = await login(Username, Password);
        if(result?.response?.data?.message){
          await Swal.fire({
            title: 'Error',
            text: result.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      }
    }
  };
  return (
    <BoxContainer $padding={70}>
      <FormContainer onSubmit={handleSubmit}>
        <Input type="text" placeholder="Nombre de usuario" onChange={onChangeUserName} />
        <Input
          type="password"
          placeholder="Contraseña"
          onChange={onChangePassword}
        />
        <SubmitButton type="submit">Iniciar sesión</SubmitButton>
      </FormContainer>

      <MutedLink href="#">
        ¿No tienes cuenta?
        <BoldLink href="#" onClick={ChangeSignForm}>
          Registrate
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};

export default SignInForm;
