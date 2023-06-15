import Layout from '../../components/Organisms/Layout';
import {Col, Row} from 'react-grid-system';
import useQuery from '../../hooks/useQuery';
import HeaderPage from '../../components/Molecules/HeaderPage';
import Card from '../../components/Molecules/Cards/Card';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import {useEffect, useState} from 'react';
import useModal from '../../hooks/useModal';
import {useAuth} from '../../Context/AuthContext';
import useMutation from '../../hooks/useMutation';
import CreateOrUpdateRestaurant
  from '../../components/Molecules/Modals/CreateorUpdateRestaurant/CreateorUpdateRestaurant';
import NotFoundPage from '../../components/Organisms/NotFoundPage';
import Skeleton from 'components/Atoms/Skeleton';

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
  const [restaurantEdit, setRestaurantEdit] = useState(null);
  const {visible, onToggle} = useModal();
  const {visible: isUpdate, onHidden, onVisible} = useModal();
  const {token} = useAuth();
  const [showMessage, setShowMessage] = useState('');
  const {data, loading, refresh} = useQuery(
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
    if (showMessage) {
      Toast.fire({
        icon: 'success',
        title: 'Restaurante actualizado correctamente',
      });
      setShowMessage(false);
    }
  }, [showMessage]);

  const onDelete = async (id) => {
    await Swal.fire({
      title: '¿Estas seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Si, borrar!',
      cancelButtonText: '¡No, cancelar!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        await DeleteRestaurant({idDelete: id});
        await refresh();
        await Toast.fire({
          icon: 'success',
          title: 'Restaurante eliminado correctamente',
          position: 'bottom-end',
        });
      }
    });
  };

  useEffect(
    () => {
      if (showMessage === 'edit') {
        Toast.fire({
          icon: 'success',
          title: 'Restaurante actualizado correctamente',
          position: 'bottom-end',
        });
      }else if(showMessage === 'add'){
        Toast.fire({
          icon: 'success',
          title: 'Restaurante agregado correctamente',
          position: 'bottom-end',
        });
      }
    },
    [showMessage],
  )

  const navigate = useNavigate();

  return (
    <Layout>
      <HeaderPage
        title="Restaurantes"
        onRefresh={refresh}
        onAdd={onToggle}
      />
      {loading ? (
        <Skeleton />
      ) : data === null || data.length === 0 ? (
        <NotFoundPage message={'Oops! Aun no has registrado ningun restuarante'}></NotFoundPage>
      ) : (
        <>
          <Row>
            {data?.map((restaurant) => (
              <Col key={restaurant.id} xs={12} md={6} lg={4}>
                <Card
                  name={restaurant.name}
                  image={restaurant.image.secure_url}
                  isActionButtons={true}
                  onDelete={() => onDelete(restaurant.id)}
                  onUpdate={async () => onEdit(restaurant)}
                  onViewMenu={() => navigate(`/app/menus/${restaurant.id}/${restaurant.name}`)}
                />
              </Col>
            ))}
          </Row>
        </>
      )}
      <CreateOrUpdateRestaurant
        restaurant={restaurantEdit}
        isOpen={visible}
        isUpdate={isUpdate}g
        onRefresh={refresh}
        setShowMessage={setShowMessage}
        onCancel={onClose}
      />
    </Layout>
  );
}
export default Restaurants;
