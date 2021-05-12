import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import RenderHomePage from './RenderHomePage';

function HomeContainer({ LoadingComponent }) {
  const { authState, authService } = useOktaAuth();
  const [userInfo] = useState(null);
  console.log('auth: ', authState);
  // we get access token and id token from authState
  // which one do we use to make backend requests?
  useEffect(() => {
    // make a request to backend for current user and put role into context api
  });

  return (
    <>
      <RenderHomePage userInfo={userInfo} authService={authService} />
    </>
  );
}

export default HomeContainer;
