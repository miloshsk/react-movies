import {
  USER_LOGIN,
  USER_ERROR,
  USER_IS_LOGGED_IN,
  USER_LOGOUT
} from "./types";
import { base } from "../firebase/firebase";

export const userError = error => dispatch => {
  const warning = { message: error.message, isWarning: true };
  dispatch({
    type: USER_ERROR,
    payload: warning
  });
  setTimeout(() => {
    const warn = { message: "", isWarning: false };
    dispatch({
      type: USER_ERROR,
      payload: warn
    });
  }, 2000);
};
export const userLogout = () => dispatch => {
  base
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: USER_LOGOUT, payload: false });
    });
};
export const userIsLogin = () => dispatch => {
  dispatch({
    type: USER_IS_LOGGED_IN,
    payload: true
  });
};
export const userLogin = user => dispatch => {
  dispatch({
    type: USER_LOGIN,
    payload: user
  });
};
