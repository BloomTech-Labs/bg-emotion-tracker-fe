import React, { useState, createContext } from 'react';

// Admin Context
export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [clubs, setClubs] = useState([]);

  return (
    <AdminContext.Provider
      value={{ members, setMembers, programs, setPrograms, clubs, setClubs }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// User Context
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [clubs, setClubs] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser, clubs, setClubs }}>
      {children}
    </UserContext.Provider>
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

export const MemberContext = createContext();

export const MemberContextProvider = ({ children }) => {
  const [id, setId] = useState('');
  const [exists, setExists] = useState('');

  return (
    <MemberContext.Provider value={{ id, setId, exists, setExists }}>
      {children}
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
