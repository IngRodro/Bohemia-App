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
import SelectMaterialUI from 'components/Atoms/SelectMaterialUI';

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
  const [type, setType] = useState(menu?.type || 'Seleccione una opción');
  const [onlyRead, setOnlyRead] = useState(false);
  const { token } = useAuth();
  const [price, setPrice] = useState(menu?.price || '');
  const [allowAddProduct, setAllowAddProduct] = useState(false);

  const [createOrUpdateMenus, { loading: loadingAddOrUpdateMenu }] =
    useMutation(isUpdate ? `/menu/${menu?.id}` : '/menu', {
      method: isUpdate ? 'put' : 'post',
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

  useEffect(() =>{
    if((products.length !== 0 && type === 'Producto') || type === 'Seleccione una opción'){
      setAllowAddProduct(false);
    }else{
      setAllowAddProduct(true);
    }
  }, [products, type]);

  useEffect(() => {
    if(products.length > 1 && type === 'Combo') {
      setOnlyRead(true);
    }else{
      setOnlyRead(false);
    }
  },[products, type]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if(!price || !type || type === 'Seleccione una opción' || products.length === 0 || e.target.name.value === ''){
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe completar todos los campos',
      });
      return;
    }
    const { errors } = await createOrUpdateMenus({
      variables: {
        name: e.target.name.value,
        products: products.map((p) => {
          return { product: p.id, quantity: parseInt(p.quantity, 10) };
        }),
        price: parseFloat(price),
        restaurant: idRestaurant,
        type: type,
      },
    });
    if (errors) {
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al crear o actualizar la opción del menú',
      });
    } else {
      setPrice('');
      setType('Seleccione una opción');
      if(isUpdate){
        setShowMessage('edit');
      }
      else{
        setShowMessage('add');
      }
    }
  };

  useEffect(() => {
    if (isUpdate) {
      setPrice(menu?.price);
      setType(menu?.type);
    }
  }, [isUpdate, menu]);

  const onAddProduct = () => {
    onToggle();
  };

  const onChangeQuantity = (e, product) => {
  const { value } = e.target;
      setProducts(
           products.map(p => {
            if(p.id === product.id){
              const element = document.getElementById(`quantity-${product.id}`);
              element.value = value;
              return {...p, quantity: value}
            }
            return p;
          })
      )


  };

  const onChangePrice = (e) => {
    const { value } = e.target;
    const regexPrice = /^\d*\.?\d{0,2}$/;
    setPrice((prevSate) => {
      if (value === '' || regexPrice.test(value)) {
        if(value === '.'){
          return '0.';
        }
        return value;
      }
      return prevSate;
    });
  };

  const onChaneSelect = (e) => {
    setType(e.target.value);
  }

  return (
    <Modal
      width={425}
      isOpen={isOpen}
      onCancel={() => {
        setType('Seleccione una opción');
        setPrice('')
        setProducts([]);
        onCancel();
        setIsCloseModal(true);
      }}
      title={isUpdate ? 'Actualizar opción del menú' : 'Agregar opción del menú'}
      okText={isUpdate ? 'Actualizar' : 'Guardar'}
      okProps={{
        type: 'submit',
        form: 'form-menu',
        loading: loadingAddOrUpdateMenu,
      }}
    >
      <form id="form-menu" method="POST" onSubmit={onSubmit}>
        <Input
          name="name"
          placeholder="Nombre"
          type="text"
          defaultValue={menu?.name}
        />
        <Input
          name="price"
          placeholder="Precio"
          type="text"
          onChange={onChangePrice}
          defaultValue={menu?.price}
          value={price}
        />
        <SelectMaterialUI
          name="type"
          label="Tipo"
          readOnly={onlyRead}
          options={[
            { value: 'Seleccione una opción', label: 'Seleccione una opción' },
            { value: 'Producto', label: 'Producto' },
            { value: 'Combo', label: 'Combo' },
          ]}
          value={type}
          onChange={onChaneSelect}
          >

        </SelectMaterialUI>
        {products.length > 0 &&
          products.map((prod) => (
            <div key={menu ? menu.id + prod.id : prod.id}>
              <Text>{prod.name}</Text>
              <div style={
                {
                  display: 'flex',
                  alignItems: 'center'
                }
              }>
                <Text>Cantidad: </Text>
              <InputStyled
                type={'number'}
                min={1}
                id={'quantity-' + prod.id}
                placeholder={'quantity'}
                defaultValue={prod.quantity}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => onChangeQuantity(e, prod)}
              />
              <DeleteIcon
                onClick={() =>
                  setProducts(products.filter((p) => p.id !== prod.id))
                }
              />
              </div>
            </div>
          ))}
      </form>
      { allowAddProduct && (
        <AddButton onClick={() => onAddProduct()}>
          <Add size={24} />
        </AddButton>
      )}
      <ShowProductsModal
        isOpen={visible}
        onCancel={onToggle}
        setProducts={setProducts}
      />
    </Modal>
  );
};

export default AddMenuOptionModal;
