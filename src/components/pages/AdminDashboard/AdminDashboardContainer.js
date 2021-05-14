import React, { useState } from 'react';

import AdminDashboardPage from './AdminDashboardPage';

const HomeContainer = () => {
  const [userInfo] = useState(null);

  return (
    <>
      <AdminDashboardPage userInfo={userInfo} />
    </>
  );
};

export default HomeContainer;
