import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import useTheme from 'hooks/useTheme';

export default function SelectLabels({
  label,
  value,
  onChange,
  options,
  error,
  helperText,
  readOnly,
  ...props
}) {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <FormControl variant="outlined" fullWidth error={error} {...props}>
        <InputLabel>{label}</InputLabel>
        <Select
          labelId="labelType"
          id="Select Type"
          value={value}
          label={label}
          onChange={onChange}
          inputProps={{ readOnly: readOnly }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
}
