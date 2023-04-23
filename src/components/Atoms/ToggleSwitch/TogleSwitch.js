import { useState } from 'react';
import { Container, Toggle } from './style';
import { useAppTheme } from '../../../Context/themeContext';

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

export default function ToggleSwitch() {
  const { themeToggle, theme } = useAppTheme();
  const [isOn, setIsOn] = useState(theme === 'light');

  const onToggle = () => {
    themeToggle();
    setIsOn(!isOn);
  };

  return (
    <Container isOn={isOn} onClick={onToggle}>
      <Toggle layout transition={spring} />
    </Container>
  );
}
