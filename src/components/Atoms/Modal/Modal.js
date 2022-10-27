import LibModal from 'react-modal';
import {
  customStyles,
  StyleBody,
  StyleCloseBtn,
  StyleCloseIcon,
  StyleFooter,
  ScrollContainer,
} from './style';
import Title from 'components/Atoms/Title';
import Button from '../Button';

const Modal = ({
  isOpen,
  children,
  onCancel,
  title,
  okText = 'Ok',
  okProps = {},
  cancelText = 'Cancel',
  cancelProps = {
    onClick: onCancel,
  },
  width = 350,
  contentStyle = customStyles.content,
  closeButton = true,
  ...restProps
}) => {
  return (
    <LibModal
      ariaHideApp={false}
      style={{ ...customStyles, content: contentStyle }}
      isOpen={isOpen}
      {...restProps}
    >
      <StyleBody
        style={{
          maxWidth: width,
        }}
      >
        {title && (
          <Title size={27} color={'textModal'}>
            {title}
          </Title>
        )}
        {closeButton && (
          <StyleCloseBtn
            labelColor="text"
            color="transparent"
            onClick={onCancel}
          >
            <StyleCloseIcon />
          </StyleCloseBtn>
        )}
        <ScrollContainer>{children}</ScrollContainer>

        <StyleFooter>
          {cancelText && (
            <Button color="error" labelColor="text" {...cancelProps}>
              {cancelText}
            </Button>
          )}
          <Button {...okProps}>{okText}</Button>
        </StyleFooter>
      </StyleBody>
    </LibModal>
  );
};

export default Modal;
