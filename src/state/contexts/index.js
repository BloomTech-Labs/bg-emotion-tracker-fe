import React, { useState, createContext } from 'react';

export const UserContext = createContext({
  user: {},
  loading: false,
  error: false,
  message: '',
  setUser: () => {},
});

export const UserContextProvider = props => {
  const setUser = user => {
    setState({ ...state, user: user });
  };

  const initState = {
    setUser: setUser,
    user: {},
    loading: false,
    error: false,
    message: '',
  };

  const [state, setState] = useState(initState);

  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};
