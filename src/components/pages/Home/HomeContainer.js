import React, { useEffect, useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { UserContext, ClubsContext } from '../../../state/contexts';

import RenderHomePage from './RenderHomePage';
import { getUserProfile, getClubs } from '../../../state/actions';
import { Redirect } from 'react-router-dom';
import { LoadingComponent } from '../../../components/common/index';

const HomeContainer = props => {
  const { authState } = useOktaAuth();
  const userContext = useContext(UserContext);
  const clubsContext = useContext(ClubsContext);
  // const { push } = useHistory();

  useEffect(() => {
    getUserProfile(authState, userContext);
    getClubs(authState, clubsContext);
  }, []);

  let role = userContext.user.roles && userContext.user.roles[0].role.name;

  // initial redirect to correct user dashboard
  if (role === 'ADMIN') {
    return <Redirect to="./AdminDashboard" />;
  } else if (role === 'CD') {
    return <Redirect to="/ClubDirectorDashboard" />;
  } else if (role === 'YDP') {
    return <Redirect to="/YDPDashboard" />;
  }

  let home = <LoadingComponent message="loading" />;

  if (!role) {
    return home;
  } else {
    return <RenderHomePage />;
  }
};

export default HomeContainer;
