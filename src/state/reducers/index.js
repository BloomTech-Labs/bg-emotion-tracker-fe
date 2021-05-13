// import all of your reducers into this file, and export them back out.
// This allows for the simplification of flow when importing reducers into your actions throughout your app.
import { SET_USER, SET_ERROR, SET_LOADING } from '../actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
        message: action.payload.message,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
