import Layout from 'components/Organisms/Layout';
import CardRestaurants from 'components/Molecules/Cards/CardProducts';
import { Col, Row } from 'react-grid-system';
import useQuery from 'hooks/useQuery';
import HeaderPage from 'components/Molecules/HeaderPage';
import Swal from 'sweetalert2';
import { useAuth } from 'Context/AuthContext';
import { useEffect, useState } from 'react';
import { PaginationContainer, StyledPagination } from '../style';
import CreateorUpdateProduct from 'components/Molecules/Modals/CreateorUpdateProduct/CreateorUpdateProduct';
import useModal from 'hooks/useModal';
import useMutation from '../../hooks/useMutation';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

function Products() {
  //Se ocupa
  const [productEdit, setProductEdit] = useState(null);
  //No se ocupa
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  //Se ocupa
  const { visible, onToggle } = useModal();
  const { visible: isUpdate, onHidden, onVisible } = useModal();
  const { token } = useAuth();
  const { data, loading, refresh } = useQuery(`/products`, page, '', '', true);
  const [DeleteProduct] = useMutation(`/products`, {
    method: 'delete',
    refresh: async () => {
      await refresh();
    },
    headers: {
      'auth-token': token,
    },
  });

  const onEdit = (prod) => {
    onVisible();
    setProductEdit(prod);
    onToggle();
  };

  const onClose = () => {
    onHidden();
    setProductEdit(null);
    onToggle();
  };

  const onDelete = async (id) => {
    await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        await DeleteProduct({ idDelete: id });
        await refresh();
        await Toast.fire({
          icon: 'success',
          title: 'Products deleted',
          position: 'bottom-end',
        });
      }
    });
  };

  //No se ocupa
  useEffect(() => {
    setTotalPages(data?.totalPages);
  }, [data?.totalPages]);

  //Se ocupa
  return (
    <Layout>
      <HeaderPage title="Products" onRefresh={refresh} onAdd={onToggle} />
      {loading ? (
        <p>
          <b>Loading...</b>
        </p>
      ) : (
        <Row>
          {data?.products?.map((prod) => (
            <Col key={prod.id} xs={12} md={6} lg={4}>
              <CardRestaurants
                name={prod.name}
                image={prod.image.secure_url}
                isActionButtons={true}
                onDelete={() => onDelete(prod.id)}
                onUpdate={async () => onEdit(prod)}
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
      <CreateorUpdateProduct
        product={productEdit}
        isOpen={visible}
        isUpdate={isUpdate}
        onRefresh={refresh}
        onCancel={onClose}
      />
    </Layout>
  );
}

export default Products;
