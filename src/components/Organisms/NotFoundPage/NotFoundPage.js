import React from 'react';
import { NotFoundWrapper, NotFoundInner, NotFound404, NotFound404Header, NotFoundHeader } from './style';

const NotFoundPage = ({ message }) => {
  return (
     <NotFoundWrapper>
        <NotFoundInner>
          <NotFound404>
            <NotFound404Header>404</NotFound404Header>
          </NotFound404>
          <NotFoundHeader>{message}</NotFoundHeader>
        </NotFoundInner>
     </NotFoundWrapper>
  );
}

export default NotFoundPage;
