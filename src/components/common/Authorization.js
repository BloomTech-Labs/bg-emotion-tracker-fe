import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../state/contexts';
export const Authorization = (roles, WrappedComponent) => {
  let { user } = useContext(UserContext);
  let role = user.roles && user.roles[0].role.name;
  let history = useHistory();
  if (role) {
    localStorage.setItem('role', role);
  }
  useEffect(() => {
    let localRole = localStorage.getItem('role');
    if (localRole && !roles.includes(localRole)) {
      history.push('/unauthorized');
    }
  }, [role]);
  return <WrappedComponent />;
};
