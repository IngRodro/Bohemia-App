import Layout from 'components/Organisms/Layout';
import CardRestaurants from 'components/Molecules/Cards/Card';
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
import NotFoundPage from '../../components/Organisms/NotFoundPage';
import Skeleton from '@mui/material/Skeleton';
import * as React from 'react';

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
  const [productEdit, setProductEdit] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const { visible, onToggle } = useModal();
  const { visible: isUpdate, onHidden, onVisible } = useModal();
  const { token } = useAuth();
  const { data, loading, refresh } = useQuery(`/products`, page, '', true);
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
      title: '¿Estas seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, ¡bórralo!',
      cancelButtonText: 'No, ¡cancelar!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        const { errors } = await DeleteProduct({ idDelete: id });
        if(errors?.response?.data?.message === "The product is being used in a menu option, you can't delete it"
        ){
          await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se puede eliminar el producto porque esta siendo usado en una opcion de menu',
          });
        }else{
          await refresh();
          if((data.length === 0 || data.length === null || data.length === undefined) && page > 1) {
            setPage((prev) => prev - 1);
          }
          await Toast.fire({
            icon: 'success',
            title: 'Products deleted',
            position: 'bottom-end',
          });
        }
      }
    });
  };

  useEffect(() => {
    setTotalPages(data?.totalPages);
  }, [data]);


  return (
    <Layout>
      <HeaderPage title="Products" onRefresh={refresh} onAdd={onToggle} />
      {loading ? (
        <Skeleton></Skeleton>
      ) : data === null || data.length===0 ? (
        <NotFoundPage message={'Oops! Aun no has registrado ningun producto'} />
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
