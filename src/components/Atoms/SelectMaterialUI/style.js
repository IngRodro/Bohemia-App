import styled from 'styled-components';
import { FormControl } from '@mui/material';

export const StyledFormControl = styled(FormControl)`
  && {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.color};
    border: none;
    border-radius: 4px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 16px;
    width: 100%;

    & .MuiSelect-root {
      color: ${({ theme }) => theme.color};
      background-color: ${({ theme }) => theme.color.background};
    }

    & .MuiInput-underline:hover:not(.Mui-disabled):before {
      border-bottom-color: ${({ theme }) => theme.color.primary};
    }

    & .MuiInput-underline:before {
      border-bottom-color: ${({ theme }) => theme.color.primary};
    }

    & .MuiInput-underline:after {
      border-bottom-color: ${({ theme }) => theme.color.primary};
    }

    & .MuiFormHelperText-root {
      color: ${({ theme }) => theme.color.primary};
    }
  }
`;
