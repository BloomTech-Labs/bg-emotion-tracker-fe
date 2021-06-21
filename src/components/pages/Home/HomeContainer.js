import React, { useEffect, useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import {
  UserContext,
  YouthContext,
  AdminContext,
} from '../../../state/contexts';

import RenderHomePage from './RenderHomePage';
import {
  getUserProfile,
  getClubs,
  getMembersReaction,
} from '../../../state/actions';
import { Redirect } from 'react-router-dom';
import { LoadingComponent } from '../../../components/common/index';

const HomeContainer = props => {
  const { authState } = useOktaAuth();
  const userContext = useContext(UserContext);
  const youthContext = useContext(YouthContext);
  const adminContext = useContext(AdminContext);

  useEffect(() => {
    getUserProfile(authState, userContext);
    getClubs(authState, userContext);
    getClubs(authState, youthContext);
    getClubs(authState, adminContext);
    getMembersReaction(authState, adminContext);
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
