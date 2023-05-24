import { createTheme } from '@mui/material';
import { useAppTheme } from 'Context/themeContext';
import { themeLight, themeDark } from 'Styles/theme';

const useTheme = () => {
  const { theme } = useAppTheme();

  const selectTheme = theme === 'light' ? themeLight : themeDark;

  return createTheme({
    components: {
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: '4px',
            padding: '8px',
            height: '48px',
          },
          select: {
            color: selectTheme.colors.text,
            fontSize: '18px',
            width: '100%',
          },
          icon: {
            color: 'red',
          },
          menu: {
            backgroundColor: 'lightgray',
            borderRadius: '4px',
          },
          menuItem: {
            color: 'blue',
            fontSize: '14px',
            padding: '8px',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: selectTheme.colors.text,
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: selectTheme.colors.inputBorder,
              },
              '&:hover fieldset': {
                borderColor: selectTheme.colors.inputBorder,
              },
            },
          }
        },
      },
    },
  });
};

export default useTheme;
