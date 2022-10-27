import styled from 'styled-components';
import Button from '../Button';
import { CloseOutline } from '@styled-icons/evaicons-outline';

export const StyleBody = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  min-width: 350px;
  padding: 20px;
`;

export const StyleFooter = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyleCloseBtn = styled(Button)`
  position: absolute;
  right: 10px;
  top: 10px;
  min-width: auto;
  width: 35px;
  height: 35px;
  padding: 0;
`;

export const StyleCloseIcon = styled(CloseOutline)`
  width: 100%;
  height: 100%;
  color: #000;
`;

export const customStyles = {
  overlay: {
    backdropFilter: 'saturate(180%) blur(20px)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    borderRadius: 0,
    border: 'none',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
  },
};

export const ScrollContainer = styled.div`
  overflow-y: scroll;
  max-height: 400px;
  scroll-behavior: smooth;
`;
