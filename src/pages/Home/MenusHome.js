import Layout from 'components/Organisms/Layout';
import { Col, Row } from 'react-grid-system';
import useQuery from 'hooks/useQuery';
import HeaderPage from 'components/Molecules/HeaderPage';
import CardMenu from 'components/Molecules/Cards/CardMenus';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PaginationContainer, StyledPagination } from '../style';

function MenusHome() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, loading, refresh } = useQuery(
    `/menu/show/${id}`,
    page,
    '',
    '',
    false
  );
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(data?.totalPages);
  }, [data?.totalPages]);

  return (
    <Layout>
      <HeaderPage title="Menu" onRefresh={refresh} />
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
            setPage(page);
          }}
        />
      </PaginationContainer>
    </Layout>
  );
}

export default MenusHome;
