import Modal from 'components/Atoms/Modal';
import Input from 'components/Atoms/Input';
import { useAuth } from 'Context/AuthContext';
import useMutation from 'hooks/useMutation';
import { H2, ImagePreview } from './style';
import { useEffect, useState } from 'react';
import Select from '../../../Atoms/Select';

const AddRestaurantModal = ({
  isOpen,
  onCancel,
  onRefresh,
  isUpdate = false,
  restaurant = null,
}) => {
  const { token } = useAuth();
  const [urlImage, setUrlImage] = useState(
    'https://res.cloudinary.com/project-tpis/image/upload/v1654393909/assets/select-image-260nw-520051081_gzcreb.png'
  );
  const [municipal, setMunicipal] = useState('');
  const [imageSelected, setImageSelected] = useState(null);
  const [createOrUpdateProduct, { loading: loadingAddOrUpdateProduct }] =
    useMutation(isUpdate ? `/restaurants/${restaurant?.id}` : '/restaurants', {
      method: isUpdate ? 'put' : 'post', // post = create, put = update
      refresh: async () => {
        onCancel();
        await onRefresh();
      },
      headers: {
        'Content-Type': 'multipart/form-data',
        'auth-token': token,
      },
    });



  const dataMunicipality = [{value : "Seleccione un municipio", label: "Seleccione un municipio"}, {value: "Agua Caliente", label: "Agua Caliente"},
    {value: "Arcatao", label: "Arcatao"}, {value: "Azacualpa", label: "Azacualpa"},{value: "Chalatenango", label: "Chalatenango"},
    {value: "Citalá", label: "Citalá"}, {value: "Comalapa", label: "Comalapa"}, {value: "Concepción Quezaltepeque", label: "Concepción Quezaltepeque"},
    {value: "Dulce Nombre de María", label: "Dulce Nombre de María"}, {value: "El Carrizal", label: "El Carrizal"}, {value: "El Paraíso", label: "El Paraíso"},
    {value: "La Laguna", label: "La Laguna"}, {value: "La Palma", label: "La Palma"}, {value: "La Reina", label: "La Reina"}, {value: "Las Vueltas", label: "Las Vueltas"},
    {value: "Nombre de Jesús", label: "Nombre de Jesús"}, {value: "Nueva Concepción", label: "Nueva Concepción"}, {value: "Nueva Trinidad", label: "Nueva Trinidad"},
    {value: "Ojos de Agua", label: "Ojos de Agua"}, {value: "Potonico", label: "Potonico"}, {value: "San Antonio de la Cruz", label: "San Antonio de la Cruz"},
    {value: "San Antonio Los Ranchos", label: "San Antonio Los Ranchos"}, {value: "San Fernando", label: "San Fernando"}, {value: "San Francisco Lempa", label: "San Francisco Lempa"},
    {value: "San Francisco Morazán", label: "San Francisco Morazán"}, {value: "San Ignacio", label: "San Ignacio"}, {value: "San Isidro Labrador", label: "San Isidro Labrador"},
    {value: "San José Cancasque", label: "San José Cancasque"}, {value: "San José Las Flores", label: "San José Las Flores"}, {value: "San Luis del Carmen", label: "San Luis del Carmen"},
    {value: "San Miguel de Mercedes", label: "San Miguel de Mercedes"}, {value: "San Rafael", label: "San Rafael"}, {value: "Santa Rita", label: "Santa Rita"},
    {value: "Tejutla", label: "Tejutla"}];

  useEffect(() => {
    if (isUpdate) {
      setUrlImage(restaurant?.image?.secure_url);
      setImageSelected(true);
    } else {
      setUrlImage(
        'https://res.cloudinary.com/project-tpis/image/upload/v1654393909/assets/select-image-260nw-520051081_gzcreb.png'
      );
    }
  }, [isUpdate, restaurant]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if(!imageSelected){
      alert("Debe seleccionar una imagen");
      return;
    }
    const name = e.target.name.value;
    const image = e.target.image.files[0];
    const municipality = municipal;
    const department = 'Chalatenango';
    const direction = e.target.direction.value;
    const phone = e.target.phone.value;
    const openingHour = e.target.openingHour.value;
    const closingHour = e.target.closingHour.value;

    let bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('image', image);
    bodyFormData.append('municipality', municipality);
    bodyFormData.append('department', department);
    bodyFormData.append('direction', direction);
    bodyFormData.append('phone', phone);
    bodyFormData.append('openingHour', openingHour);
    bodyFormData.append('closingHour', closingHour);
    await createOrUpdateProduct({
      variables: bodyFormData,
    });
    setUrlImage(
      'https://res.cloudinary.com/project-tpis/image/upload/v1654393909/assets/select-image-260nw-520051081_gzcreb.png'
    );
  };

  const ChangeImage = (e) => {
    const image = e.target.files[0];
    const imagePreview = URL.createObjectURL(image);
    setUrlImage(imagePreview);
    setImageSelected(true);
  };

  const onchangeMunicipality = async (e) => {
    setMunicipal(e.value);
  };

  return (
    <Modal
      width={400}
      isOpen={isOpen}
      onCancel={() => {
        onCancel();
        setUrlImage(
          'https://res.cloudinary.com/project-tpis/image/upload/v1654393909/assets/select-image-260nw-520051081_gzcreb.png'
        );
      }}
      title={isUpdate ? 'Edit Restaurants' : 'Add Restaurants'}
      okText={isUpdate ? 'Edit' : 'Save'}
      okProps={{
        type: 'submit',
        form: 'form-restaurant',
        loading: loadingAddOrUpdateProduct,
      }}
    >
      <form id="form-restaurant" method="POST" onSubmit={onSubmit}>
        <Input
          name="name"
          placeholder="Name"
          type="text"
          defaultValue={restaurant?.name}
          required
        />
        <Select
          id={'municipality'}
          required
          type="text"
          name="Municipality"
          options={dataMunicipality}
          placeholder="Municipality"
          defaultValue={'Hola Mundo'}
          onChange={(e) => onchangeMunicipality(e)}
        />
        <Input
          name="direction"
          placeholder="Direction"
          type="text"
          defaultValue={restaurant?.direction}
          required
        />
        <Input
          name="phone"
          placeholder="Phone"
          type="text"
          defaultValue={restaurant?.phone}
          required
        />
        <Input
          name="openingHour"
          placeholder="OpeningHour"
          type="time"
          defaultValue={restaurant?.opening_hour}
          required
        />
        <Input
          name="closingHour"
          placeholder="ClosingHour"
          type="time"
          defaultValue={restaurant?.closing_hour}
          required
        />
        <Input
          display="none"
          id={'image'}
          name="image"
          type="file"
          onChange={ChangeImage}
          accept="image/*"
        />
      </form>
      <H2>Image</H2>
      <ImagePreview
        src={urlImage}
        alt={restaurant?.name}
        onClick={() => {
          document.getElementById('image').click();
        }}
      />
    </Modal>
  );
};

export default AddRestaurantModal;
