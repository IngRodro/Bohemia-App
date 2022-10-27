import Layout from '../../components/Organisms/Layout';
import { Col, Row } from 'react-grid-system';
import useQuery from '../../hooks/useQuery';
import HeaderPage from '../../components/Molecules/HeaderPage';
import Card from '../../components/Molecules/Cards/CardProducts';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Select from '../../components/Atoms/Select';
import { PaginationContainer, StyledPagination } from '../style';
import NotFoundPage from '../../components/Organisms/NotFoundPage';

function RestaurantsHome() {
  const [page, setPage] = useState(1);
  const [municipality, setMunicipality] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const { data, loading, refresh } = useQuery(
    '/restaurants/',
    page,
    municipality === 'Seleccione un municipio' ? '' : municipality,
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
    setMunicipality(e.value);
  };
  useEffect(() => {
    setTotalPages(data?.totalPages || 0);
  }, [data?.totalPages]);

  console.log(data);

  return (
    <Layout>
      <HeaderPage
        title="Restaurants"
        child={
          <>
            <Select
              id={'municipality'}
              required
              type="text"
              name="Municipality"
              options={dataMunicipality}
              placeholder="Municipality"
              onChange={(e) => onchangeMunicipality(e)}
            />
          </>
        }
        onRefresh={refresh}
      />
      {loading ? (
        <p>
          <b>Loading...</b>
        </p>
      ) : data === null ? (
        <NotFoundPage></NotFoundPage>
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
                  action={() => navigate(`/home/menus/${id}`)}
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
