// Button
import { StyleButton } from './style';
import Loading from '../Loading';

const Button = ({
  className,
  onClick,
  color = 'primary',
  labelColor = 'buttonText',
  loading = false,
  disabled = false,
  children,
  ...restProps
}) => {
  return (
    <StyleButton
      $color={color}
      $labelColor={labelColor}
      onClick={onClick}
      disabled={loading || disabled}
      className={`btn ${className}`}
      {...restProps}
    >
      {loading && <Loading />}
      {children}
    </StyleButton>
  );
};

export default Button;
