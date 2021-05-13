import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import RenderMemberScanner from './RenderMemberScanner';

function MemberScannerContainer({ LoadingComponent }) {
  const { authService } = useOktaAuth();
  const [userInfo] = useState(null);

  return (
    <>
      <RenderMemberScanner userInfo={userInfo} authService={authService} />
    </>
  );
}

export default MemberScannerContainer;
