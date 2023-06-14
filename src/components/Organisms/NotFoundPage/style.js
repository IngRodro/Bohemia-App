import styled from 'styled-components';

export const NotFoundWrapper = styled.div`
  position: relative;
  height: 80vh;
`;

export const NotFoundInner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 720px;
  width: 100%;
  line-height: 1.4;
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
`;

export const NotFound404 = styled.div`
  position: relative;
  height: 100px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
`;

export const NotFound404Header = styled.h1`
  font-family: 'Montserrat', sans-serif;
  color: #ececec;
  font-weight: 900;
  font-size: 276px;
  margin: 0px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const NotFoundHeader = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 40px;
  color: #000;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  margin: 0;
`;
