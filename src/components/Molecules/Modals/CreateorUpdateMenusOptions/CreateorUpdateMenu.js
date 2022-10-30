import Modal from 'components/Atoms/Modal';
import { useAuth } from 'Context/AuthContext';
import Input from '../../../Atoms/Input';
import useMutation from 'hooks/useMutation';
import { useEffect, useState } from 'react';
import { ShowProductsModal } from '../ShowProducts';
import useModal from 'hooks/useModal';
import { AddButton, Text, DeleteIcon, InputStyled } from './style';
import { Add } from '@styled-icons/fluentui-system-filled/Add';
import Swal from 'sweetalert2';

const AddMenuOptionModal = ({
  isOpen,
  onCancel,
  onRefresh,
  isUpdate = false,
  menu = null,
  idRestaurant,
  isCloseModal = false,
  setIsCloseModal,
  setShowMessage,
}) => {
  const { visible, onToggle } = useModal();
  const [products, setProducts] = useState(menu?.products || []);
  const { token } = useAuth();

  const [createOrUpdateMenus, { loading: loadingAddOrUpdateMenu }] =
    useMutation(isUpdate ? `/menu/${menu?.id}` : '/menu', {
      method: isUpdate ? 'put' : 'post', // post = create, put = update
      refresh: async () => {
        onCancel();
        await onRefresh();
      },
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    });

  useEffect(() => {
    if (isUpdate) {
      setProducts(
        menu?.products.map((product) => {
          return {
            id: product.product.id,
            name: product.product.name,
            quantity: product.quantity,
          };
        })
      );
    } else {
      setProducts([]);
    }
  }, [isUpdate, menu, isCloseModal]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { errors } = await createOrUpdateMenus({
      variables: {
        name: e.target.name.value,
        products: products.map((p) => {
          return { product: p.id, quantity: parseInt(p.quantity, 10) };
        }),
        price: parseFloat(e.target.price.value),
        restaurant: idRestaurant,
        type: products.length > 1 ? 'combo' : 'product',
      },
    });

    if (errors) {
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al crear o actualizar la opción del menú',
      });


    } else {
      setShowMessage(true);
    }
  };

  const onAddProduct = () => {
    onToggle();
  };

  const onChangeQuantity = (e, product) => {
    const { value } = e.target;
    const newProducts = products.map((p) => {
      if (p.id === product.id) {
        return { ...p, quantity: value };
      }
      return p;
    });
    setProducts(newProducts);
  };

  return (
    <Modal
      width={400}
      isOpen={isOpen}
      onCancel={() => {
        setProducts([]);
        onCancel();
        setIsCloseModal(true);
      }}
      title={isUpdate ? 'Edit Menu' : 'Add Menu'}
      okText={isUpdate ? 'Edit' : 'Save'}
      okProps={{
        type: 'submit',
        form: 'form-product',
        loading: loadingAddOrUpdateMenu,
      }}
    >
      <form id="form-product" method="POST" onSubmit={onSubmit}>
        <Input
          name="name"
          placeholder="Name"
          type="text"
          required
          defaultValue={menu?.name}
        />
        <Input
          name="price"
          placeholder="Price"
          type="text"
          defaultValue={menu?.price}
          required
        />
        {products.length > 0 &&
          products.map((prod) => (
            <div key={menu ? menu.id + prod.id : prod.id}>
              <Text>{prod.name}</Text>
              <InputStyled
                type={'number'}
                placeholder={'quantity'}
                defaultValue={prod.quantity}
                onChange={(e) => onChangeQuantity(e, prod)}
              />
              <DeleteIcon
                onClick={() =>
                  setProducts(products.filter((p) => p.id !== prod.id))
                }
              />
            </div>
          ))}
      </form>
      <AddButton onClick={() => onAddProduct()}>
        <Add size={24} />
      </AddButton>
      <ShowProductsModal
        isOpen={visible}
        onCancel={onToggle}
        setProducts={setProducts}
      />
    </Modal>
  );
};

export default AddMenuOptionModal;
