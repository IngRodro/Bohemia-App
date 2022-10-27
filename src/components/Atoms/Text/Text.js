import { StyleText } from './style';

const Text = ({ children, htmlTag = 'p', color = 'text', size = 16, lineHeight = size + 10, ...restProps }) => {
  return (
    <StyleText as={htmlTag} $size={size} $color={color} $lineHeight={lineHeight} {...restProps}>
      {children}
    </StyleText>
  );
};

export default Text;
