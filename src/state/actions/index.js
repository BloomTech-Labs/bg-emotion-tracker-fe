// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file
import {
  getProfileData,
  getClubsData,
  getClubData,
  getMemberData,
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

export const getClub = async (id, context) => {
  await getClubData(id)
    .then(res => {
      context.setClub(res);
    })
    .catch(error => {
      return error;
    });
};

export const getMember = async (id, context) => {
  await getMemberData(id)
    .then(res => {
      context.setMember(res);
    })
    .catch(error => {
      return error;
    });
};
