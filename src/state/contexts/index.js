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

// Member Context

export const MemberContext = createContext({
  member: {},
  loading: false,
  error: false,
  message: '',
  setMember: () => {},
});

export const MemberContextProvider = props => {
  const setMember = member => {
    setState({ ...state, member });
  };

  const initState = {
    member: {},
    setMember,
  };

  const [state, setState] = useState(initState);

  return (
    <MemberContext.Provider value={state}>
      {props.children}
    </MemberContext.Provider>
  );
};

// Emoji Context

export const EmojiContext = createContext({
  emoji: '',
  loading: false,
  error: false,
  message: '',
  setEmoji: () => '',
});

export const EmojiContextProvider = props => {
  const setEmoji = emoji => {
    setState({ ...state, emoji });
  };

  const initState = {
    emoji: {},
    setEmoji,
  };

  const [state, setState] = useState(initState);

  return (
    <EmojiContext.Provider value={state}>
      {props.children}
    </EmojiContext.Provider>
  );
};
