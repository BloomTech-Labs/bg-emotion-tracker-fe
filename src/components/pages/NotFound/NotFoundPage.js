import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutContainer } from '../../common';

const NotFoundPage = () => {
  return (
    <LayoutContainer>
      <h1>404 Page Not Found</h1>
      <Link to="/">
        <button>Back To Home</button>
      </Link>
    </LayoutContainer>
  );
};

export default NotFoundPage;
