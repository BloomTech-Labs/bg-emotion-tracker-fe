import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../state/contexts';

export const Logout = () => {
  const userCtx = useContext(UserContext);
  userCtx.resetUser();
  localStorage.removeItem('okta-token-storage');
  localStorage.removeItem('okta-cache-storage');
  localStorage.removeItem('role');
  localStorage.removeItem('okta-pkce-storage');
  return <Redirect to="/login">Logout</Redirect>;
};
