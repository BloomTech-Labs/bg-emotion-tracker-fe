import React, { useState } from 'react';

import RenderYDPDashboard from './YDPDashboardPage';

const HomeContainer = () => {
  const [userInfo] = useState(null);

  return (
    <>
      <RenderYDPDashboard userInfo={userInfo} />
    </>
  );
};

export default HomeContainer;
