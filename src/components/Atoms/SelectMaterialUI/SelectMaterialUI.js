import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
  return (
    <FormControl fullWidth error={error} {...props}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="labelType"
        id="Select Type"
        value={value}
        label={label}
        onChange={onChange}
        inputProps={{readOnly:  readOnly}}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
