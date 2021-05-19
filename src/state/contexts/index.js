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
  activity: {},
  loading: false,
  error: false,
  message: '',
  setPrograms: () => [],
  //member object context
  memberObject: {},
  setMemberObject: () => {},
});

export const ProgramContextProvider = props => {
  const setPrograms = programs => {
    setState({ ...state, programs: programs });
  };

  //member object context
  const setMemberObject = memberObject => {
    setState({ ...state, memberObject: memberObject });
  };

  const initState = {
    setPrograms: setPrograms,
    programs: [],
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

// Activity Context

export const ActivityContext = createContext({
  activity: {},
  loading: false,
  error: false,
  message: '',
  setActivity: () => {},
});

export const ActivityContextProvider = props => {
  const setActivity = activity => {
    setState({ ...state, activity });
  };

  const initState = {
    setActivity,
  };

  const [state, setState] = useState(initState);

  return (
    <ActivityContext.Provider value={state}>
      {props.children}
    </ActivityContext.Provider>
  );
};

// Clubs Context

export const ClubsContext = createContext({
  club: {},
  clubs: [],
  loading: false,
  error: false,
  message: '',
  setClub: () => {},
  setClubs: () => [],
});

export const ClubsContextProvider = props => {
  const setClubs = clubs => {
    setState({ ...state, clubs });
  };

  const setClub = club => {
    setState({ ...state, club });
  };

  const initState = {
    clubs: [],
    club: {},
    setClub,
    setClubs,
  };

  const [state, setState] = useState(initState);

  return (
    <ClubsContext.Provider value={state}>
      {props.children}
    </ClubsContext.Provider>
  );
};

// Club Context

export const ClubContext = createContext({
  club: {},
  loading: false,
  error: false,
  message: '',
  setClub: () => {},
});

export const ClubContextProvider = props => {
  const setClub = club => {
    setState({ ...state, club });
  };

  const initState = {
    club: {},
    setClub,
  };

  const [state, setState] = useState(initState);

  return (
    <ClubContext.Provider value={state}>{props.children}</ClubContext.Provider>
  );
};
