import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import RenderEmojiSelector from './RenderEmojiSelector';

function EmojiSelector(props) {
  const { authService } = useOktaAuth();
  const [userInfo] = useState(null);

  return (
    <>
      <RenderEmojiSelector userInfo={userInfo} authService={authService} />
    </>
  );
}

export default EmojiSelector;
