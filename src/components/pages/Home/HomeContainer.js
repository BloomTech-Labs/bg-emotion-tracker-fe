import React, { useState, useEffect, useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { UserContext } from '../../../state/contexts';
import axios from 'axios';

import RenderHomePage from './RenderHomePage';
import { getUserProfile } from '../../../state/actions';
import { useHistory } from 'react-router-dom';

const HomeContainer = props => {
  const [userInfo] = useState(null);
  const { authState } = useOktaAuth();
  const context = useContext(UserContext);
  const { push } = useHistory();

  useEffect(() => {
    getUserProfile(authState, context);
  }, []);

  let role = context.user.roles && context.user.roles[0].role.name;

  // initial redirect to correct user dashboard
  if (role === 'YDP') {
    push('/YDPDashboard');
  }

  return (
    <>
      <RenderHomePage userInfo={userInfo} />
    </>
  );
};

export default HomeContainer;
