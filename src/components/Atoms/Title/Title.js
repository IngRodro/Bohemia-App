import { StyleTitle } from './style';

const Title = ({
  children,
  htmlTag = 'h2',
  color = 'text',
  size = 45,
  lineHeight = size + 20,
  button = false,
  ...restProps
}) => {
  return (
    <StyleTitle
      as={htmlTag}
      $size={size}
      $color={color}
      $lineHeight={lineHeight}
      $button={button}
      {...restProps}
    >
      {children}
    </StyleTitle>
  );
};

export default Title;
