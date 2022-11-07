import styled from 'styled-components';

export const StyleWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.bgCard};
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 15px 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.02);
  }
`;

export const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const StyleImage = styled.img`
  border-radius: 12px;
  width: ${({ $width }) => ($width ? $width : 35)}%;
  margin: ${({ $margin }) => ($margin ? $margin : '10px auto')};
  min-width: 40%;
  height: ${({ $height }) => $height};
  object-fit: cover;
`;

export const ImagesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  flex-flow: row wrap;
`;
