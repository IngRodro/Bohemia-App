import Layout from '../../components/Organisms/Layout';
import { Col, Row } from 'react-grid-system';
import useQuery from '../../hooks/useQuery';
import HeaderPage from '../../components/Molecules/HeaderPage';
import Card from '../../components/Molecules/Cards/CardProducts';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import useModal from '../../hooks/useModal';
import { useAuth } from '../../Context/AuthContext';
import useMutation from '../../hooks/useMutation';
import { PaginationContainer, StyledPagination } from '../style';
import CreateorUpdateRestaurant from '../../components/Molecules/Modals/CreateorUpdateRestaurant/CreateorUpdateRestaurant';

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

function Restaurants() {
  //Se ocupa
  const [restaurantEdit, setRestaurantEdit] = useState(null);
  //No se ocupa
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  //Se ocupa
  const { visible, onToggle } = useModal();
  const { visible: isUpdate, onHidden, onVisible } = useModal();
  const { token } = useAuth();
  const { data, loading, refresh } = useQuery(
    '/restaurants/byUser',
    null,
    true
  );
  const [DeleteRestaurant] = useMutation(`/restaurants`, {
    method: 'delete',
    refresh: async () => {
      await refresh();
    },
    headers: {
      'auth-token': token,
    },
  });

  const onEdit = (rest) => {
    onVisible();
    setRestaurantEdit(rest);
    onToggle();
  };

  const onClose = () => {
    onHidden();
    setRestaurantEdit(null);
    onToggle();
  };

  useEffect(() => {
    setTotalPages(data?.totalPages);
  }, [data?.totalPages]);

  const onDelete = async (id) => {
    await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this restaurant!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        await DeleteRestaurant({ idDelete: id });
        await refresh();
        await Toast.fire({
          icon: 'success',
          title: 'Restaurants deleted',
          position: 'bottom-end',
        });
      }
    });
  };

  const navigate = useNavigate();

  return (
    <Layout>
      <HeaderPage
        title="Restaurants"
        onRefresh={refresh}
        onAdd={onToggle}
      />
      {loading ? (
        <p>
          <b>Loading...</b>
        </p>
      ) : (
        <Row>
          {data?.map((restaurant) => (
            <Col key={restaurant.id} xs={12} md={6} lg={4}>
              <Card
                name={restaurant.name}
                image={restaurant.image.secure_url}
                action={() => navigate(`/app/menus/${restaurant.id}`)}
                isActionButtons={true}
                onDelete={() => onDelete(restaurant.id)}
                onUpdate={async () => onEdit(restaurant)}
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
      <CreateorUpdateRestaurant
        product={restaurantEdit}
        isOpen={visible}
        isUpdate={isUpdate}
        onRefresh={refresh}
        onCancel={onClose}
      />
    </Layout>
  );
}

export default Restaurants;
