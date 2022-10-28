import {
  BoxContainer,
  HeaderContainer,
  HeaderText,
  InnerContainer,
  SmallText,
  TopContainer,
  BackDrop,
} from './style';
import SignIn from '../../Molecules/Sign/SignIn';
import SignUp from '../../Molecules/Sign/SignUp';
import { AppSignProvider, useAppSign } from '../../../Context/signContext';

const SignForm = () => {

  return (
    <AppSignProvider>
      <RenderSignForm />
    </AppSignProvider>
  );
};

const RenderSignForm = () => {
  const backdropVariants = {
    expanded: {
      width: '233%',
      height: '1150px',
      borderRadius: '50%',
      transform: 'rotate(60deg)',
    },
    collapsed: {
      width: '160%',
      height: '550px',
      borderRadius: '50%',
      transform: 'rotate(60deg)',
    },
  };

  const expandingTransition = {
    type: 'spring',
    stiffness: 35,
  };

  const { signForm, Expanded } = useAppSign();
  return (
    <BoxContainer>
      <TopContainer>
        <BackDrop
          initial={false}
          animate={Expanded ? 'expanded' : 'collapsed'}
          variants={backdropVariants}
          transition={expandingTransition}
        />
        {signForm === 'signIn' ? (
          <HeaderContainer>
            <HeaderText>Welcome</HeaderText>
            <HeaderText>Back</HeaderText>
            <SmallText>Please sign-in to continue!</SmallText>
          </HeaderContainer>
        ) : (
          <HeaderContainer>
            <HeaderText>Register</HeaderText>
            <HeaderText>Now</HeaderText>
            <SmallText>Please sign-up to continue!</SmallText>
          </HeaderContainer>
        )}
      </TopContainer>
      <InnerContainer>
        {signForm === 'signIn' ? <SignIn /> : <SignUp />}
      </InnerContainer>
    </BoxContainer>
  );
};

export default SignForm;
