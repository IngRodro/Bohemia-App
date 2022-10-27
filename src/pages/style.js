import styled from 'styled-components';
import { Pagination } from '@mui/material';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  padding: 20px 0;
`;

export const StyledPagination = styled(Pagination)`
  && {
    .MuiPaginationItem-page {
      color: ${({ theme }) => theme.colors.text};
      border-color: ${({ theme }) => theme.colors.text};
      font-size: 20px;
      &:hover {
        background: ${({ theme }) => theme.colors.paginationNav};
      }
    }
    .MuiPaginationItem-previousNext {
      color: ${({ theme }) => theme.colors.text};
      border-color ${({ theme }) => theme.colors.text};
      &:hover {
        background: ${({ theme }) => theme.colors.paginationNav};
      }
    }
    .Mui-selected {
      background: ${({ theme }) => theme.colors.paginationNav};
      &:hover {
        background: ${({ theme }) => theme.colors.background};
      }
    }


  }
`;
