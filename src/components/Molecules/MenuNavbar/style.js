import styled from 'styled-components';
import Button from '../../Atoms/Button';
import { DarkTheme } from '@styled-icons/fluentui-system-regular/DarkTheme';
import { DoorArrowLeft } from '@styled-icons/fluentui-system-regular/DoorArrowLeft';
import { LogIn } from '@styled-icons/boxicons-regular/LogIn';

export const StyleMenuNavbar = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
`;

export const StyleMenuItem = styled(Button)`
  padding: ${({ $type }) => ($type === 'PageItem' ? '0 20px' : '0')};
  margin-right: 10px;
  min-width: auto;
  transition: color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  font-weight: 700;
  border-radius: ${({ $type }) => ($type === 'PageItem' ? '0' : '50')}%;
  background: transparent;
  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.primary};
    border-bottom-color: ${({ theme, $type }) =>
      $type === 'PageItem' ? theme.colors.primary : 'transparent'};
  }
`;

export const StyleThemeIcon = styled(DarkTheme)`
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyleCloseSessionIcon = styled(DoorArrowLeft)`
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const StyleLogInIcon = styled(LogIn)`
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.success};
  }
`;
