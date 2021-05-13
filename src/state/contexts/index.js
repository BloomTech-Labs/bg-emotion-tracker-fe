import React, { useState, createContext } from 'react';

export const UserContext = createContext({
  user: {},
  programs: [],
  loading: false,
  error: false,
  message: '',
  setUser: () => {},
  setPrograms: () => [],
});

export const UserContextProvider = props => {
  const setUser = user => {
    setState({ ...state, user: user });
  };

  const setPrograms = programs => {
    setState({ ...state, programs: programs });
  };

  const initState = {
    setUser: setUser,
    user: {},
    setPrograms: setPrograms,
    programs: [],
    loading: false,
    error: false,
    message: '',
  };

  const [state, setState] = useState(initState);

  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};
