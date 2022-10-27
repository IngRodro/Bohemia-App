import styled from 'styled-components';

export const StyleInput = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  box-sizing: border-box;
  background: transparent;
  font-size: 18px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.inputText};
  text-align: start;
  cursor: text;
  border-radius: 2px;
  padding: 10px;
  margin: 0 0 10px 0;
  display: ${({ $display }) => $display};
  &:focus {
    margin-bottom: 7px;
    border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
`;
