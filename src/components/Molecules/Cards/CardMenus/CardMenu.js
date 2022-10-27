import Title from 'components/Atoms/Title';
import {
  StyleImage,
  StyleWrapper,
  ActionWrapper,
  ImagesWrapper,
} from './style';
import Button from 'components/Atoms/Button';
import Text from '../../../Atoms/Text';

const CardMenu = ({
  products,
  name,
  price,
  action,
  isActionButtons,
  onDelete,
  onUpdate,
}) => {
  const isImage = products.length === 1;
  return (
    <StyleWrapper onClick={action}>
      {isImage && (
        <StyleImage
          loading="lazy"
          src={products[0].product.image.secure_url}
          $width={100}
        />
      )}
      {!isImage && (
        <ImagesWrapper>
          {products.map(({ product }) => {
            return (
              <StyleImage
                key={product.id}
                loading="lazy"
                src={product.image.secure_url}
              />
            );
          })}
        </ImagesWrapper>
      )}
      <Title>{name}</Title>
      <Text size={22}>
        <strong style={{ fontSize: '22px' }}>Price:</strong> ${price.toFixed(2)}
      </Text>
      {isActionButtons && (
        <ActionWrapper>
          {onUpdate && (
            <Button color={'success'} onClick={() => onUpdate()}>
              Update
            </Button>
          )}
          {onDelete && (
            <Button color={'error'} onClick={() => onDelete()}>
              Delete
            </Button>
          )}
        </ActionWrapper>
      )}
    </StyleWrapper>
  );
};

export default CardMenu;
