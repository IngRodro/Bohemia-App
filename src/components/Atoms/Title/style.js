import styled from 'styled-components';

export const StyleTitle = styled.h2`
  font-size: ${({ $size }) => $size}px;
  line-height: ${({ $lineHeight }) => $lineHeight}px;
  color: ${({ theme, $color }) => theme.colors[$color]};
  font-family: ${({ $fontFamily }) => $fontFamily};


  ${({ $button }) =>
    $button &&
    `
    cursor: pointer;
  `}
`;
