import Modal from 'components/Atoms/EspecialModal';
import CardProducts from 'components/Molecules/Cards/CardProducts';
import { Col, Row } from 'react-grid-system';
import useQuery from 'hooks/useQuery';
import CreateorUpdateProduct from '../CreateorUpdateProduct/CreateorUpdateProduct';
import useModal from '../../../../hooks/useModal';
import {useState} from 'react';

const ShowProductsModal = ({ isOpen, onCancel, setProducts }) => {
  const { data, loading, refresh } = useQuery(`/products`);
  const { visible: visibleProduct, onToggle: onToggleProduct } = useModal();
  const { onHidden, onVisible } = useModal();
  const [isCloseModal, setIsCloseModal] = useState(true);

  const onCardClick = ({ id, name }) => {
    setProducts((prev) => {
      if (prev.length === 0) {
        return [{ id, name, quantity: 1 }];
      } else {
        const find = prev.find((product) => product.id === id);
        return find ? prev : [...prev, { id, name, quantity: 1 }];
      }
    });
    onCancel();
  };

  const onClose = () => {
    setIsCloseModal(true);
    onHidden();
    onToggleProduct();
  };

  const onAdd = () => {
    setIsCloseModal(false);
    onToggleProduct();
  };

  return (<>
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      title="Seleccione un Producto"
      cancelText="Cancel"
      width={720}
      closeButton={true}
      okText={'Agregar nuevo Producto'}
      okProps={
        {
          onClick: onAdd,
          children: 'Agregar Producto',
          type: 'primary',
        }
      }
    >
      {loading ? (
        <p>
          <b>Loading...</b>
        </p>
      ) : (
        <Row>
          {data?.products?.map(({ id, name, image }) => (
            <Col key={id} xs={12} md={6} lg={6}>
              <CardProducts
                name={name}
                image={image.secure_url}
                action={() => onCardClick({ id, name })}
              />
            </Col>
          ))}
        </Row>
      )}
    </Modal>
      <CreateorUpdateProduct
        isOpen={visibleProduct}
        onRefresh={refresh}
        onCancel={onClose}
        isCloseModal={isCloseModal}
      />
  </>
  );
};

export default ShowProductsModal;
