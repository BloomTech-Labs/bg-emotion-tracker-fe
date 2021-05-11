import React from 'react';
import { Redirect } from 'react-router-dom';

export const Logout = () => {
  localStorage.removeItem('okta-token-storage');
  return <Redirect to="/login">Logout</Redirect>;
};
