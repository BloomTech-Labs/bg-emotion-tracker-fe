import React, { useEffect, useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { UserContext } from '../../../state/contexts';

import RenderHomePage from './RenderHomePage';
import { getUserProfile } from '../../../state/actions';
import { useHistory } from 'react-router-dom';
import { LoadingComponent } from '../../../components/common/index';

const HomeContainer = props => {
  const { authState } = useOktaAuth();
  const context = useContext(UserContext);
  const { push } = useHistory();

  useEffect(() => {
    getUserProfile(authState, context);
  }, []);

  let role = context.user.roles && context.user.roles[0].role.name;

  // initial redirect to correct user dashboard
  if (role === 'ADMIN') {
    push('./AdminDashboard');
  } else if (role === 'CD') {
    push('./ClubDirectorDashboard');
  } else if (role === 'YDP') {
    push('/YDPDashboard');
  }

  let home = <LoadingComponent message="loading" />;

  if (!role) {
    return home;
  } else {
    return <RenderHomePage />;
  }
};

export default HomeContainer;
