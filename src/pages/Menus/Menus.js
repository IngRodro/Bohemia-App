import Layout from 'components/Organisms/Layout';
import { Col, Row } from 'react-grid-system';
import useQuery from 'hooks/useQuery';
import HeaderPage from 'components/Molecules/HeaderPage';
import CardMenu from 'components/Molecules/Cards/CardMenus';
import { useParams, useNavigate } from 'react-router-dom';
import CreateOrUpdateMenu from 'components/Molecules/Modals/CreateorUpdateMenusOptions/CreateorUpdateMenu';
import useModal from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { PaginationContainer, StyledPagination } from '../style';
import Swal from 'sweetalert2';
import useMutation from '../../hooks/useMutation';
import { useAuth } from 'Context/AuthContext';

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

function Menus() {
  const { id, page = 1 } = useParams();
  const { data, loading, refresh } = useQuery(`/menu/${id}`);
  const { token } = useAuth();
  const [isCloseModal, setIsCloseModal] = useState(true);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const { visible, onToggle } = useModal();
  const [menuEdit, setMenuEdit] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const { visible: isUpdate, onHidden, onVisible } = useModal();
  const [DeleteProduct] = useMutation(`/menu`, {
    method: 'delete',
    refresh: async () => {
      await refresh();
    },
    headers: {
      'auth-token': token,
    },
  });

  const onEdit = (menu) => {
    setIsCloseModal(false);
    onVisible();
    setMenuEdit(menu);
    onToggle();
  };

  const onDelete = async (id) => {
    await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Menu Option!',
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

  const onAdd = () => {
    setIsCloseModal(false);
    onToggle();
  };

  const onClose = () => {
    setIsCloseModal(true);
    onHidden();
    setMenuEdit(null);
    onToggle();
  };

  useEffect(() => {
    setTotalPages(data?.totalPages);
  }, [data?.totalPages]);

  useEffect(
    () => {
      if (showMessage) {
        if(menuEdit){
          Toast.fire({
            icon: 'success',
            title: 'Opción de menu actualizada',
            position: 'bottom-end',
          });
        }else{
          Toast.fire({
            icon: 'success',
            title: 'Opción de menu creada',
            position: 'bottom-end',
          });
        }
      }
    },
    [showMessage, menuEdit],
  )

  return (
    <Layout>
      <HeaderPage title="Menu" onRefresh={refresh} onAdd={onAdd} />
      {loading ? (
        <p>
          <b>Loading...</b>
        </p>
      ) : (
        <Row>
          {data?.menus?.map((menu) => (
            <Col key={menu.id} xs={12} md={6} lg={4}>
              <CardMenu
                name={menu.name}
                products={menu.products}
                price={menu.price}
                id={menu.id}
                isActionButtons={true}
                onUpdate={async () => onEdit(menu)}
                onDelete={async () => onDelete(menu.id)}
                isUpdate={isUpdate}
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
          page={parseInt(page, 10)}
          onChange={(e, page) => {
            navigate(`/app/menus?page=${page}`);
          }}
        />
      </PaginationContainer>
      <CreateOrUpdateMenu
        isOpen={visible}
        onCancel={onClose}
        idRestaurant={id}
        onRefresh={refresh}
        isUpdate={isUpdate}
        menu={menuEdit}
        setShowMessage={setShowMessage}
        isCloseModal={isCloseModal}
      />
    </Layout>
  );
}

export default Menus;
