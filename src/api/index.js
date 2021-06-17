import axios from 'axios';

const baseUrl = 'https://bg-emotion-tracker-be-b.herokuapp.com';
let URI = 'https://bg-emotion-tracker-be-a.herokuapp.com/';
if (process.env.NODE_ENV === 'production') {
  URI = process.env.REACT_APP_API_URI;
}

// we will define a bunch of API calls here.
const apiUrl = `${URI}profiles`;
const profileUrl = `${URI}users/getuserinfo`;
const profilesUrl = `${URI}profiles`;
const clubsUrl = `${URI}clubs/clubs`;
const clubUrl = `${URI}clubs/club/:id`;
const memberUrl = `${URI}members/check?mid=id`;

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const getExampleData = () => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/photos?albumId=1`)
    .then(response => response.data);
};

const getAuthHeader = authState => {
  if (!authState.isAuthenticated) {
    throw new Error('Not authenticated');
  }
  return { Authorization: `Bearer ${authState.accessToken}` };
};

const getDSData = (url, authState) => {
  // here's another way you can compose together your API calls.
  // Note the use of GetAuthHeader here is a little different than in the getProfileData call.
  const headers = getAuthHeader(authState);
  if (!url) {
    throw new Error('No URL provided');
  }
  return axios
    .get(url, { headers })
    .then(res => JSON.parse(res.data))
    .catch(err => err);
};

const apiAuthGet = authHeader => {
  return axios.get(apiUrl, { headers: authHeader });
};

const profileAuthGet = authHeader => {
  return axios.get(profileUrl, { headers: authHeader });
};

/*
This is the scaffold's way of api requests but currently doesn't work.  It is worthwhile to keep this code and try and fix for future api requests because it is more elegant than our current version which hard codes urls and has duplication. 

const getProfileData = authState => {
  try {
    return profileAuthGet(getAuthHeader(authState)).then(
      response => response.data
    );
  } catch (error) {
    return new Promise(() => {
      throw error;
    });
  }
};*/

// get Leaderboard

const getLeaderboard = id => {
  let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));

  const promise = axios.get(
    `https://bg-emotion-tracker-be-b.herokuapp.com/leaderboard/leaderboard`,
    {
      headers: {
        Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
      },
    }
  );

  const dataPromise = promise.then(response => {
    return response.data;
  });

  return dataPromise;
};

const getProfileData = authState => {
  // getting token from local storage
  let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));

  // creating a promise for the axios request
  const promise = axios.get(
    'https://bg-emotion-tracker-be-b.herokuapp.com/users/getuserinfo',
    {
      headers: {
        Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
      },
    }
  );

  // using .then, creating a new promise which extracts the data
  const dataPromise = promise.then(response => response.data);

  // return it
  return dataPromise;
};

const getClubsData = authState => {
  let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));

  const promise = axios.get(
    'https://bg-emotion-tracker-be-b.herokuapp.com/clubs/summary',
    {
      headers: {
        Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
      },
    }
  );

  const dataPromise = promise.then(response => {
    return response.data;
  });

  return dataPromise;
};

// Get Club data
const getClubData = id => {
  let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));

  const promise = axios.get(
    `https://bg-emotion-tracker-be-b.herokuapp.com/clubs/club/${id}`,
    {
      headers: {
        Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
      },
    }
  );

  const dataPromise = promise.then(response => {
    return response.data;
  });

  return dataPromise;
};

// Get Activities data
const getActivityData = () => {
  let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));

  const promise = axios.get(
    `https://bg-emotion-tracker-be-b.herokuapp.com/clubs/clubs`,
    {
      headers: {
        Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
      },
    }
  );

  const dataPromise = promise.then(response => {
    return response.data;
  });

  return dataPromise;
};

// get member by id
const getMemberData = id => {
  let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));

  const promise = axios.get(
    `https://bg-emotion-tracker-be-b.herokuapp.com/members/check?mid=${id}`,
    {
      headers: {
        Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
      },
    }
  );

  const dataPromise = promise.then(response => {
    return response.data;
  });

  return dataPromise;
};

// Get all members
const getMembersData = () => {
  let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));

  const promise = axios.get(
    `https://bg-emotion-tracker-be-b.herokuapp.com/members/members`,
    {
      headers: {
        Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
      },
    }
  );

  const dataPromise = promise.then(response => {
    return response.data;
  });

  return dataPromise;
};

// add member
const postMemberData = member => {
  let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));

  const promise = axios.post(
    `https://bg-emotion-tracker-be-b.herokuapp.com/members/member`,
    {
      memberid: member,
    },
    {
      headers: {
        Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
      },
    }
  );

  const dataPromise = promise.then(response => {
    return response.data;
  });

  return dataPromise;
};

// Post new activity
const postActivityData = (clubId, activityName) => {
  let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));

  const promise = axios.post(
    `https://bg-emotion-tracker-be-b.herokuapp.com/activities/activity/addclub/${clubId}`,
    {
      activityname: activityName,
    },
    {
      headers: {
        Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
      },
    }
  );

  const dataPromise = promise.then(response => {
    return response.data;
  });

  return dataPromise;
};

// Post new club
const postClubData = clubName => {
  let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));

  const promise = axios.post(
    `https://bg-emotion-tracker-be-b.herokuapp.com/clubs/club/newClub`,
    {
      clubname: clubName,
    },
    {
      headers: {
        Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
      },
    }
  );

  const dataPromise = promise.then(response => {
    return response.data;
  });

  return dataPromise;
};

const fetchMembersReaction = () => {
  let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));

  const promise = axios.get(
    `https://bg-emotion-tracker-be-b.herokuapp.com/memberreactions/alert`,
    {
      headers: {
        Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
      },
    }
  );

  const dataPromise = promise.then(response => {
    return response.data;
  });

  return dataPromise;
};

// const getLeaderboard = () => {
//   axios
//     .get(
//       `https://bg-emotion-tracker-be-b.herokuapp.com/leaderboard/leaderboard`,
//       {
//         headers: {
//           Authorization: `Bearer ${authtoken}`,
//         },
//       }
//     )
//     .then(e => {
//       console.log(e);
//     });
// };

const fetchLeaderboard = () => {
  let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));

  const promise = axios.get(
    `https://bg-emotion-tracker-be-b.herokuapp.com/leaderboard/leaderboard`,
    {
      headers: {
        Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
      },
    }
  );

  const dataPromise = promise.then(response => {
    return response.data;
  });

  return dataPromise;
};
export {
  sleep,
  getLeaderboard,
  getClubsData,
  getClubData,
  getMemberData,
  getExampleData,
  getProfileData,
  getDSData,
  getActivityData,
  postActivityData,
  getMembersData,
  postMemberData,
  postClubData,
  fetchMembersReaction,
  fetchLeaderboard,
  baseUrl,
};
