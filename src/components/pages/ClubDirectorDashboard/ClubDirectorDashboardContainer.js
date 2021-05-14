import React, { useState } from 'react';

import ClubDirectorDashboardPage from './ClubDirectorDashboardPage';

const HomeContainer = () => {
  const [userInfo] = useState(null);

  return (
    <>
      <ClubDirectorDashboardPage userInfo={userInfo} />
    </>
  );
};

export default HomeContainer;
