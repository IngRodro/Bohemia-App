import styled from 'styled-components';

export const StyleText = styled.p`
  font-size: ${({ $size }) => $size}px;
  line-height: ${({ $lineHeight }) => $lineHeight}px;
  color: ${({ theme, $color }) => theme.colors[$color]};
  width: max-content;
  margin: 0 10px 0 0;
`;
