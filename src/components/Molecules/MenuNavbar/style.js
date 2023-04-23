import styled from 'styled-components';
import Button from '../../Atoms/Button';
import {
  IconSunFilled, IconLogin, IconLogout, IconMoonStars,
} from '@tabler/icons-react';

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
  color: ${({ theme }) => (theme.colors.text)};
  border-radius: ${({ $type }) => ($type === 'PageItem' ? '0' : '50')}%;
  background: transparent;
  > svg {
    margin-left: 5px;
  }
  :hover {
    opacity: 1;
    border-bottom-color: ${({ theme, $type }) => ($type === 'PageItem' ? theme.colors.primary : 'transparent')};
    color: ${({ theme }) => theme.colors.primary};
    > svg {
      color: ${({ theme, $colorSvgHover }) => theme.colors[$colorSvgHover]};
    }
  }
`;

export const StyleThemeIcon = styled(IconSunFilled)`
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyleThemeIconDark = styled(IconMoonStars)`
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyleCloseSessionIcon = styled(IconLogout)`
  color: ${({ theme }) => theme.colors.text};
`;

export const StyleLogInIcon = styled(IconLogin)`
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s;
`;

