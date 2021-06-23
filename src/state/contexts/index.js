import React, { useState, createContext } from 'react';

// Admin Context
export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [memberReactions, setMemberReactions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [feedback, setFeedback] = useState([]);

  return (
    <AdminContext.Provider
      value={{
        members,
        setMembers,
        programs,
        setPrograms,
        clubs,
        setClubs,
        memberReactions,
        setMemberReactions,
        leaderboard,
        setLeaderboard,
        feedback,
        setFeedback,
      }}
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

  const resetUser = () => {
    setUser({});
    setClubs({});
  };

  return (
    <UserContext.Provider value={{ user, setUser, clubs, setClubs, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};

// YDP Context
export const YouthContext = createContext();

export const YouthContextProvider = ({ children }) => {
  const [activity, setActivity] = useState({});
  const [activities, setActivities] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [club, setClub] = useState({});
  const [id, setId] = useState('');
  const [exists, setExists] = useState('');
  const [emoji, setEmoji] = useState('');

  return (
    <YouthContext.Provider
      value={{
        id,
        setId,
        exists,
        setExists,
        emoji,
        setEmoji,
        activity,
        setActivity,
        clubs,
        setClubs,
        club,
        setClub,
        activities,
        setActivities,
      }}
    >
      {children}
    </YouthContext.Provider>
  );
};
