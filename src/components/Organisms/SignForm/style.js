import styled from 'styled-components';
import { motion } from 'framer-motion';

export const BoxContainer = styled.div`
  width: 360px;
  min-height: 550px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 4px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

export const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 32px; ;
`;

export const BackDrop = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: -300px;
  left: -100px;
  background: ${({ theme }) => theme.colors.primary};
  z-index: ${({ theme }) => theme.zIndex.five};
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

export const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  z-index: 10;
  margin: 7px 0 0 0;
`;

export const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
