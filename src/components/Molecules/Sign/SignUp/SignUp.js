import React, { useContext } from 'react';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  MutedLink,
  SubmitButton,
} from '../style';
import Input from '../../../Atoms/Input';
import Swal from 'sweetalert2';
import { SignContext } from '../../../../Context/signContext';
import withReactContent from 'sweetalert2-react-content';
import { useAuth } from 'Context/AuthContext';

const SignInForm = () => {
  const MySwal = withReactContent(Swal);
  const { ChangeSignForm } = useContext(SignContext);
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name === '' ||
      username === '' ||
      password === '' ||
      passwordConfirm === ''
    ) {
      await Swal.fire({
        title: 'Error',
        text: 'All fields are required',
        icon: 'error',
      });
    } else if (password !== passwordConfirm) {
      await Swal.fire({
        title: 'Error',
        text: 'Passwords do not match',
        icon: 'error',
      });
    } else {
      const payload = {
        name,
        username,
        password,
      };
      const result = await signUp(payload)
      if(result?.response?.data?.message){
        await Swal.fire({
          title: 'Error',
          text: result.response.data.message,
          icon: 'error',
        });
        e.target.username.value = '';
      }else{
        await Swal.fire({
          title: 'Success',
          text: 'Usuario creado correctamente',
          icon: 'success',
        });
        ChangeSignForm('signIn');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName((prevState) => {
          if (value.split('')[value.length - 1].match(/[a-zA-Z\s]/)) {
            return value;
          } else {
            return prevState;
          }
        });
        break;
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'passwordConfirm':
        setPasswordConfirm(value);
        break;
      default:
        break;
    }
  };

  return (
    <BoxContainer $padding={20}>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Full Name"
          name={'name'}
          onChange={handleChange}
          value={name}
        />
        <Input
          type="text"
          placeholder="Username"
          name={'username'}
          id={'username'}
          onChange={handleChange}
          value={username}
        />
        <Input
          type="password"
          placeholder="Password"
          name={'password'}
          onChange={handleChange}
          value={password}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          name={'passwordConfirm'}
          onChange={handleChange}
          value={passwordConfirm}
        />
        <SubmitButton type="submit">Signup</SubmitButton>
      </FormContainer>
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={ChangeSignForm}>
          SignIn
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};

export default SignInForm;
