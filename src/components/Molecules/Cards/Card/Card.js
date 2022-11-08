import Title from 'components/Atoms/Title';
import { StyleImage, StyleWrapper, ActionWrapper } from './style';
import Button from 'components/Atoms/Button';
import Text from '../../../Atoms/Text';

const CardRestaurant = ({
  image,
  name,
  municipality,
  direction,
  phone,
  opening_hour,
  closing_hour,
  action,
  isActionButtons,
  onDelete,
  onUpdate,
  onViewMenu,
}) => {
  return (
    <StyleWrapper onClick={action}>
      <StyleImage loading="lazy" src={image} />
      <Title size={30}>{name}</Title>
      {municipality && (
        <Text size={22}>
          <strong style={{ fontSize: '22px' }}>Municipio: </strong>
          {municipality}
        </Text>
      )}
      {direction && (
        <Text size={22}>
          <strong style={{ fontSize: '22px' }}>Dirección:</strong> {direction}
        </Text>
      )}
      {phone && (
        <Text size={22}>
          <strong style={{ fontSize: '22px' }}>Teléfono:</strong> {phone}
        </Text>
      )}
      {opening_hour && (
        <Text size={22}>
          <strong style={{ fontSize: '22px' }}>Hora de apertura:</strong>{' '}
          {opening_hour}
        </Text>
      )}
      {closing_hour && (
        <Text size={22}>
          <strong style={{ fontSize: '22px' }}>Hora de cierre:</strong>{' '}
          {closing_hour}
        </Text>
      )}
      {isActionButtons && (
        <ActionWrapper>
          {onUpdate && (
            <Button color={'success'} onClick={() => onUpdate()}>
              Actualizar
            </Button>
          )}
          {onDelete && (
            <Button color={'error'} onClick={() => onDelete()}>
              Eliminar
            </Button>
          )}
          {onViewMenu && (<Button color={'primary'} onClick={() => onViewMenu()}>Ver Menu</Button>)}
        </ActionWrapper>
      )}
    </StyleWrapper>
  );
};

export default CardRestaurant;
