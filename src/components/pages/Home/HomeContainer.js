import React, { useState, useEffect, useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { UserContext } from '../../../state/contexts';

import RenderHomePage from './RenderHomePage';
import { getUserProfile } from '../../../state/actions';

function HomeContainer({ LoadingComponent }) {
  const [userInfo] = useState(null);
  const { authState } = useOktaAuth();
  const context = useContext(UserContext);

  useEffect(() => {
    getUserProfile(authState, context);
  }, []);

  return (
    <>
      <RenderHomePage userInfo={userInfo} />
    </>
  );
}

export default HomeContainer;
