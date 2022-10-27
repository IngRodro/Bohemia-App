import Modal from 'components/Atoms/Modal';
import Input from 'components/Atoms/Input';
import { useAuth } from 'Context/AuthContext';
import useMutation from 'hooks/useMutation';
import { H2, ImagePreview } from './style';
import { useEffect, useState } from 'react';

const AddProductModal = ({
  isOpen,
  onCancel,
  onRefresh,
  isUpdate = false,
  product = null,
}) => {
  const { token } = useAuth();
  const [urlImage, setUrlImage] = useState(
    'https://res.cloudinary.com/project-tpis/image/upload/v1654393909/assets/select-image-260nw-520051081_gzcreb.png'
  );
  const [createOrUpdateProduct, { loading: loadingAddOrUpdateProduct }] =
    useMutation(isUpdate ? `/products/${product?.id}` : '/products', {
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
      setUrlImage(product?.image?.secure_url);
    } else {
      setUrlImage(
        'https://res.cloudinary.com/project-tpis/image/upload/v1654393909/assets/select-image-260nw-520051081_gzcreb.png'
      );
    }
  }, [isUpdate, product]);

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
      title={isUpdate ? 'Edit Products' : 'Add Products'}
      okText={isUpdate ? 'Edit' : 'Save'}
      okProps={{
        type: 'submit',
        form: 'form-product',
        loading: loadingAddOrUpdateProduct,
      }}
    >
      <form id="form-product" method="POST" onSubmit={onSubmit}>
        <Input
          name="name"
          placeholder="Name"
          type="text"
          defaultValue={product?.name}
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
        alt={product?.name}
        onClick={() => {
          document.getElementById('image').click();
        }}
      />
    </Modal>
  );
};

export default AddProductModal;
