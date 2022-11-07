import styled from 'styled-components';
import Button from '../../../Atoms/Button';
import { Delete } from '@styled-icons/material-sharp/Delete';
import Input from '../../../Atoms/Input';

export const AddButton = styled(Button)`
  margin: 10px 0;
  width: 100%;
`;

export const Text = styled.p`
  margin: 0;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textModal};
`;

export const DeleteIcon = styled(Delete)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.error};
  cursor: pointer;
  margin-left: 10px;
`;

export const InputStyled = styled(Input)`
  width: 55%;
  margin: 10px;
`;
