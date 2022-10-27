import { createContext, useContext, useState } from 'react';

export const SignContext = createContext({
  signForm: 'signIn',
  ChangeSignForm: () => {},
  Expanded: false,
});

export const AppSignProvider = ({ children }) => {
  const [signForm, setSignForm] = useState('signIn');
  const [Expanded, setExpanded] = useState(false);

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, 800);
  };

  const switchToSignUp = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setSignForm('signUp');
    }, 400);
  };

  const switchToSignIn = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setSignForm('signIn');
    }, 400);
  };

  const ChangeSignForm = () => {
    signForm === 'signIn' ? switchToSignUp() : switchToSignIn();
  };

  return (
    <SignContext.Provider
      value={{
        signForm,
        ChangeSignForm,
        Expanded,
      }}
    >
      {children}
    </SignContext.Provider>
  );
};

export const useAppSign = () => useContext(SignContext);
