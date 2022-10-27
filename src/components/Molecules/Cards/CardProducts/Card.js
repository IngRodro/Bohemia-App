import Title from 'components/Atoms/Title';
import { StyleImage, StyleWrapper, ActionWrapper } from './style';
import Button from 'components/Atoms/Button';
import Text from '../../../Atoms/Text';

const CardRestaurant = ({
  image,
  name,
  department,
  municipality,
  direction,
  phone,
  delivery,
  opening_hour,
  closing_hour,
  action,
  isActionButtons,
  onDelete,
  onUpdate,
}) => {
  return (
    <StyleWrapper onClick={action}>
      <StyleImage loading="lazy" src={image} />
      <Title>{name}</Title>
      {department && (
        <Text size={22}>
          <strong style={{ fontSize: '22px' }}>Department:</strong> {department}
        </Text>
      )}
      {municipality && (
        <Text size={22}>
          <strong style={{ fontSize: '22px' }}>Municipality:</strong>{' '}
          {municipality}
        </Text>
      )}
      {direction && (
        <Text size={22}>
          <strong style={{ fontSize: '22px' }}>Direction:</strong> {direction}
        </Text>
      )}
      {phone && (
        <Text size={22}>
          <strong style={{ fontSize: '22px' }}>Phone:</strong> {phone}
        </Text>
      )}
      {delivery && (
        <Text size={22}>
          <strong style={{ fontSize: '22px' }}>Delivery:</strong>{' '}
          {delivery ? 'Yes' : 'No'}
        </Text>
      )}
      {opening_hour && (
        <Text size={22}>
          <strong style={{ fontSize: '22px' }}>Opening Hour:</strong>{' '}
          {opening_hour}
        </Text>
      )}
      {closing_hour && (
        <Text size={22}>
          <strong style={{ fontSize: '22px' }}>Closing Hour:</strong>{' '}
          {closing_hour}
        </Text>
      )}
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

export default CardRestaurant;
