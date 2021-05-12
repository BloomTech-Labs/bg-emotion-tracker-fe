import React, { useState, useEffect, useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import RenderHomePage from './RenderHomePage';
import { getProfileData } from '../../../api';
import { userContext } from '../../../state/contexts/index';

function HomeContainer({ LoadingComponent }) {
  const { authState, authService } = useOktaAuth();
  const [userInfo] = useState(null);
  useEffect(() => {
    getProfileData(authState)
      .then(res => console.log('result: ', res))
      .catch(err => err);
  });

  return (
    <>
      <RenderHomePage userInfo={userInfo} authService={authService} />
    </>
  );
}

export default HomeContainer;
