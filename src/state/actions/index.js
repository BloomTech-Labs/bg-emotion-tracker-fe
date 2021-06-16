// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file
import {
  getProfileData,
  getClubsData,
  getClubData,
  postClubData,
  getMemberData,
  fetchMembersReaction,
  getActivityData,
  postActivityData,
  getMembersData,
  postMemberData,
} from '../../api';

export const SET_USER = 'SET_USER';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';

export const setLoading = (dispatch, status) =>
  dispatch({ type: SET_LOADING, payload: status });

export const setError = (dispatch, error) =>
  dispatch({
    type: SET_ERROR,
    payload: { error: error.status, message: error.message },
  });

export const getUserProfile = async (authState, context) => {
  await getProfileData(authState)
    .then(res => {
      context.setUser(res);
    })
    .catch(error => {
      return error;
    });
};

export const getClubs = async (authState, context) => {
  await getClubsData(authState)
    .then(res => {
      context.setClubs(res);
    })
    .catch(error => {
      return error;
    });
};

export const getMembersReaction = async (authState, context) => {
  await fetchMembersReaction(authState)
    .then(res => {
      context.setMemberReactions(res);
    })
    .catch(error => {
      return error;
    });
};

export const getClub = async (id, context) => {
  await getClubData(id)
    .then(res => {
      context.setClub(res);
    })
    .catch(error => {
      return error;
    });
};

export const postClub = async clubName => {
  await postClubData(clubName)
    .then(res => {
      console.log('post club' + res);
    })
    .catch(error => {
      return error;
    });
};

export const getMember = async (id, context) => {
  await getMemberData(id)
    .then(res => {
      context.setId(id);
      context.setExists(res);
    })
    .catch(error => {
      return error;
    });
};

export const getMembers = async context => {
  await getMembersData()
    .then(res => {
      context.setMembers(res);
    })
    .catch(error => {
      return error;
    });
};

export const getActivities = async context => {
  await getActivityData()
    .then(res => {
      context.setPrograms(res);
    })
    .catch(error => {
      return error;
    });
};

export const postActivity = async (clubId, activityName) => {
  await postActivityData(clubId, activityName)
    .then(res => {
      console.log('Post activity: ' + res);
    })
    .catch(error => {
      return error;
    });
};

export const postMember = async member => {
  await postMemberData(member)
    .then(res => {
      console.log('Post member: ' + res);
    })
    .catch(error => {
      return error;
    });
};
