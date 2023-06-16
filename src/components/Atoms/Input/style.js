import styled from 'styled-components';

export const StyleInput = styled.input`
  background-color: #eee;
  border: none;
  display: ${(props) => (props.display)};
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;
