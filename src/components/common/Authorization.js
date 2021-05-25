import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../state/contexts';

export const Authorization = (roles, WrappedComponent) => {
  let { user } = useContext(UserContext);
  let role = user.roles && user.roles[0].role.name;
  let history = useHistory();
  useEffect(() => {
    if (!role && !roles.includes(role)) {
      history.push('/unauthorized');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);
  return <WrappedComponent />;
};
