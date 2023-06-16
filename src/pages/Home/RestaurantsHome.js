import Layout from '../../components/Organisms/Layout';
import { Col, Row } from 'react-grid-system';
import useQuery from '../../hooks/useQuery';
import HeaderPage from '../../components/Molecules/HeaderPage';
import Card from '../../components/Molecules/Cards/Card';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SelectMaterialUi from '../../components/Atoms/SelectMaterialUI';
import { PaginationContainer, StyledPagination } from '../style';
import NotFoundPage from '../../components/Organisms/NotFoundPage';
import Text from '../../components/Atoms/Text';
import Skeleton from '../../components/Atoms/Skeleton';
import * as React from 'react';

function RestaurantsHome() {
  const [page, setPage] = useState(1);
  const [municipality, setMunicipality] = useState(
    localStorage.getItem('municipality') || 'Seleccione un municipio'
  );
  const [totalPages, setTotalPages] = useState(0);
  const { data, loading, refresh, errors } = useQuery(
    '/restaurants/',
    page,
    municipality,
    true
  );
  const navigate = useNavigate();



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

  const onchangeMunicipality = async (e) => {
    setMunicipality(e.target.value);
    setPage(1);
    localStorage.setItem('municipality', e.target.value);
  };

  useEffect(() => {
    setTotalPages(data?.totalPages || 0);
  }, [data?.totalPages]);

  console.log(errors)

  return (
    <Layout>
      <HeaderPage
        title="Restaurantes"
        child={<>
          <Text size={18}>Filtrar por municipio:</Text>
          <div style={
             {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '300px',
                maxWidth: '400px',
             }
          }>
            <>
              <SelectMaterialUi
                label="Municipio"
                value={municipality}
                options={dataMunicipality}
                onChange={onchangeMunicipality}
              />
            </>
          </div>
        </>
        }
        onRefresh={refresh}
      />
      {loading || errors ? (
        <Skeleton />
      ) : data === null ? (
        <NotFoundPage message={'Oops! Aun no se han registrado restaurantes para este lugar'}></NotFoundPage>
      ) : (<>
        <Row>
          {data?.restaurants?.map(
            ({
              id,
              name,
              image,
              department,
              municipality,
              direction,
              delivery,
              phone,
              openingHour,
              closingHour,
            }) => (
              <Col key={id} xs={12} md={6} lg={4}>
                <Card
                  name={name}
                  image={image.secure_url}
                  department={department}
                  municipality={municipality}
                  direction={direction}
                  delivery={delivery}
                  phone={phone}
                  opening_hour={openingHour}
                  closing_hour={closingHour}
                  action={() => navigate(`/home/menus/${id}/${name}`)}
                  isActionButtons={true}
                />
              </Col>
            )
          )}
        </Row>
        <PaginationContainer>
        <StyledPagination
        count={totalPages}
        variant="outlined"
        shape="rounded"
        size="large"
        page={parseInt(page, 10)}
        onChange={(e, page) => {
        setPage(page);
      }}
        />
        </PaginationContainer>
        </>
      )}
    </Layout>
  );
}

export default RestaurantsHome;
