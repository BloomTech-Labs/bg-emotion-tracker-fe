import React, { useState, createContext } from 'react';

//user context
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

// program context
export const ProgramContext = createContext({
  programs: [],
  loading: false,
  error: false,
  message: '',
  setPrograms: () => [],
});

export const ProgramContextProvider = props => {
  const setPrograms = programs => {
    setState({ ...state, programs: programs });
  };

  const initState = {
    setPrograms: setPrograms,
    programs: [],
    loading: false,
    error: false,
    message: '',
  };

  const [state, setState] = useState(initState);

  return (
    <ProgramContext.Provider value={state}>
      {props.children}
    </ProgramContext.Provider>
  );
};
