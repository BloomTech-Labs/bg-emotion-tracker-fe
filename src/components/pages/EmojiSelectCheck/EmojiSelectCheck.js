import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import RenderEmojiSelectCheck from './RenderEmojiSelectCheck';

function EmojiSelectCheck({ LoadingComponent, pageProps }) {
  const { authService } = useOktaAuth();
  const [userInfo] = useState(null);

  return (
    <>
      <RenderEmojiSelectCheck
        userInfo={userInfo}
        authService={authService}
        pageProps={pageProps}
      />
    </>
  );
}

export default EmojiSelectCheck;
