import React from 'react';
import { Row, Col } from 'react-grid-system';
import Skeleton from '@mui/material/Skeleton';
import { themeLight, themeDark } from 'Styles/theme';
import { createTheme } from '@mui/material';
import { useAppTheme } from 'Context/themeContext';

const SkeletonComponent = () => {
  const { theme } = useAppTheme();
  const selectTheme = theme === 'light' ? themeLight : themeDark;

  const themeSkeleton = createTheme({
    components: {
      MuiSkeleton: {
        styleOverrides: {
          root: {
            backgroundColor: selectTheme.colors.skeleton,
          },
        },
      },
    },
  });

  return (
    <Row>
      <Col xs={12} md={6} lg={4}>
        <Skeleton variant="rectangular" width={'100%'} height={300} theme={themeSkeleton} />
        <Skeleton height={20} theme={themeSkeleton}/>
        <Skeleton height={20} theme={themeSkeleton}/>
        <Skeleton width={'100%'} height={40} theme={themeSkeleton}/>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Skeleton variant="rectangular" width={'100%'} height={300} theme={themeSkeleton} />
        <Skeleton height={20} theme={themeSkeleton}/>
        <Skeleton height={20} theme={themeSkeleton}/>
        <Skeleton width={'100%'} height={40} theme={themeSkeleton}/>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Skeleton variant="rectangular" width={'100%'} height={300} theme={themeSkeleton} />
        <Skeleton height={20} theme={themeSkeleton}/>
        <Skeleton height={20} theme={themeSkeleton}/>
        <Skeleton width={'100%'} height={40} theme={themeSkeleton}/>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Skeleton variant="rectangular" width={'100%'} height={300} theme={themeSkeleton} />
        <Skeleton height={20} theme={themeSkeleton}/>
        <Skeleton height={20} theme={themeSkeleton}/>
        <Skeleton width={'100%'} height={40} theme={themeSkeleton}/>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Skeleton variant="rectangular" width={'100%'} height={300} theme={themeSkeleton} />
        <Skeleton height={20} theme={themeSkeleton}/>
        <Skeleton height={20} theme={themeSkeleton}/>
        <Skeleton width={'100%'} height={40} theme={themeSkeleton}/>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Skeleton variant="rectangular" width={'100%'} height={300} theme={themeSkeleton} />
        <Skeleton height={20} theme={themeSkeleton}/>
        <Skeleton height={20} theme={themeSkeleton}/>
        <Skeleton width={'100%'} height={40} theme={themeSkeleton}/>
      </Col>
    </Row>
  );
};

export default SkeletonComponent;
