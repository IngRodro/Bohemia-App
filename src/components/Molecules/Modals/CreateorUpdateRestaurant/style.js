import styled from 'styled-components';
import Input from '../../../Atoms/Input';

export const ImagePreview = styled.img`
  width: 100%;
  height: auto;
`;

export const H2 = styled.h2`
  font-size: 1.5rem;
  margin: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
`;

export const InputStyled = styled(Input)`
  width: 55%;
  margin: 10px;
`;
