import Modal from 'components/Atoms/EspecialModal';
import CardProducts from 'components/Molecules/Cards/Card';
import { Col, Row } from 'react-grid-system';
import useQuery from 'hooks/useQuery';
import CreateOrUpdateProduct from '../CreateorUpdateProduct/CreateorUpdateProduct';
import useModal from '../../../../hooks/useModal';
import {useEffect, useState} from 'react';
import {PaginationContainer, StyledPagination} from '../../../../pages/style';
import Skeleton from '../../../Atoms/Skeleton'
import * as React from 'react';

const ShowProductsModal = ({ isOpen, onCancel, setProducts }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const { data, loading, refresh } = useQuery(`/products`, page);
  const { visible: visibleProduct, onToggle: onToggleProduct } = useModal();
  const { onHidden } = useModal();
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

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages);
    }
  }, [data]);

  return (<>
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      title="Seleccione un Producto"
      cancelText="Cancelar"
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
        <Skeleton></Skeleton>
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
      <PaginationContainer>
        <StyledPagination
          count={totalPages}
          variant="outlined"
          shape="rounded"
          size="large"
          page={page}
          onChange={(e, page) => {
            setPage(page);
          }}
        />
      </PaginationContainer>
    </Modal>
      <CreateOrUpdateProduct
        isOpen={visibleProduct}
        onRefresh={refresh}
        onCancel={onClose}
        isCloseModal={isCloseModal}
      />
  </>
  );
};

export default ShowProductsModal;
