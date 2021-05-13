import React, { useState, useEffect, useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { UserContext } from '../../../state/contexts';

import RenderYDPDashboard from './YDPDashboardPage';
import { getUserProfile } from '../../../state/actions';
import { useHistory } from 'react-router-dom';

const HomeContainer = props => {
  const [userInfo] = useState(null);
  const context = useContext(UserContext);

  return (
    <>
      <RenderYDPDashboard userInfo={userInfo} />
    </>
  );
};

export default HomeContainer;
