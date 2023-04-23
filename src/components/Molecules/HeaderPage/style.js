import styled from 'styled-components';
import { Refresh } from '@styled-icons/boxicons-regular/Refresh';

export const StyleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

export const StyleActions = styled.div`
  button {
    margin-left: 10px;
  }
`;

export const StyledChildWrapper = styled.div`
  height: 100%;
  display: inline-flex;
  align-items: center;
  margin-right: 15px;
`;

export const StyleRefreshIcon = styled(Refresh)`
  color: ${({ theme }) => theme.colors.buttonText};
`;
