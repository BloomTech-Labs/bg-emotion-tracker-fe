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
  clubs: [],
  activity: {},
  loading: false,
  error: false,
  message: '',
  setPrograms: () => [],
  setClubs: () => [],
  setActivity: () => {},
  //member object context
  memberObject: {},
  setMemberObject: () => {},
});

export const ProgramContextProvider = props => {
  const setPrograms = programs => {
    setState({ ...state, programs: programs });
  };

  const setClubs = clubs => {
    setState({ ...state, clubs });
  };

  const setActivity = activity => {
    setState({ ...state, activity });
  };

  //member object context
  const setMemberObject = memberObject => {
    setState({ ...state, memberObject: memberObject });
  };

  const initState = {
    setPrograms: setPrograms,
    setClubs,
    setActivity,
    programs: [],
    clubs: [],
    activity: {},
    loading: false,
    error: false,
    message: '',
    //member object context
    memberObject: {
      clubId: 'None',
      activityId: 'None',
      memberId: 'None',
      memberReaction: 'None',
    },
    setMemberObject: setMemberObject,
  };

  const [state, setState] = useState(initState);

  return (
    <ProgramContext.Provider value={state}>
      {props.children}
    </ProgramContext.Provider>
  );
};
