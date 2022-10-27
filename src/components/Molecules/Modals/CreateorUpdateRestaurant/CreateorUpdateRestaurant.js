import Modal from 'components/Atoms/Modal';
import Input from 'components/Atoms/Input';
import { useAuth } from 'Context/AuthContext';
import useMutation from 'hooks/useMutation';
import { H2, ImagePreview } from './style';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (isUpdate) {
      setUrlImage(restaurant?.image?.secure_url);
    } else {
      setUrlImage(
        'https://res.cloudinary.com/project-tpis/image/upload/v1654393909/assets/select-image-260nw-520051081_gzcreb.png'
      );
    }
  }, [isUpdate, restaurant]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.files[0];
    let bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('image', image);
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
        <Input
          name="email"
          placeholder="Email"
          type="text"
          defaultValue={restaurant?.email}
          required
        />
        <Input
          name="department"
          placeholder="Department"
          type="text"
          defaultValue={restaurant?.department}
          required
        />
        <Input
          name="direction"
          placeholder="Direction"
          type="text"
          defaultValue={restaurant?.direction}
          required
        />
        <Input
          name="delivery"
          placeholder="Delivery"
          type="text"
          defaultValue={restaurant?.delivery}
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
          type="text"
          defaultValue={restaurant?.opening_hour}
          required
        />
        <Input
          name="closingHour"
          placeholder="ClosingHour"
          type="text"
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
