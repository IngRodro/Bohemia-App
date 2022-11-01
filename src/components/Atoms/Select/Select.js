import { StyleSelect } from './style';

const Select = ({ options = [], className = '', value, ...props }) => {
  return (
    <StyleSelect
      id={props.id}
      className={`react-select-wrapper ${className}`}
      classNamePrefix="react-select"
      options={options}
      value={value}
      {...props}
    />
  );
};

export default Select;
