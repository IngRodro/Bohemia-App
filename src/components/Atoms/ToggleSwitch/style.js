import styled from 'styled-components';
import { motion } from 'framer-motion';

const BUTTON_STATES = {
  ON: 'flex-end',
  OFF: 'flex-start',
};

export const Container = styled.div`
  width: 60px;
  height: 30px;
  background-color: ${({ theme }) => (theme.colors.toggleButton)};
  display: flex;
  justify-content: ${({ isOn }) => (isOn ? BUTTON_STATES.ON : BUTTON_STATES.OFF)};
  border-radius: 50px;
  padding: 5px;
  cursor: pointer;
  margin: auto 50px;
`;

export const Toggle = styled(motion.div)`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 40px;
`;
