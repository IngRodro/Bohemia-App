import ReactSelect from 'react-select';
import styled from 'styled-components';

export const StyleSelect = styled(ReactSelect)`
  margin-bottom: 20px;
  margin-right: 20px;

  .react-select__control {
    min-height: 45px;
    min-width: 200px;
    border: none;
    border-radius: 16px;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.shadowInput};
  }

  .react-select__menu {
    border-radius: 16px;
  }

  .react-select__option {
    color: #000;
    border-radius: 16px;
  }
`;
