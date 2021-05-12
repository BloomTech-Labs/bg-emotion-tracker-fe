import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import RenderEmojiConfirmRedirect from './RenderEmojiConfirmRedirect';

function EmojiConfirmRedirect({ LoadingComponent }) {
  const { authService } = useOktaAuth();
  const [userInfo] = useState(null);

  return (
    <>
      <RenderEmojiConfirmRedirect
        userInfo={userInfo}
        authService={authService}
      />
    </>
  );
}

export default EmojiConfirmRedirect;
