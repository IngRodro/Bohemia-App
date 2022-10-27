import Modal from 'components/Atoms/Modal';
import CardProducts from 'components/Molecules/Cards/CardProducts';
import { Col, Row } from 'react-grid-system';
import useQuery from 'hooks/useQuery';

const ShowProductsModal = ({ isOpen, onCancel, setProducts }) => {
  const { data, loading } = useQuery(`/products`);

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

  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      title="Products"
      okText="Ok"
      cancelText="Cancel"
      width={720}
      closeButton={true}
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
  );
};

export default ShowProductsModal;
