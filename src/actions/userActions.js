import { USER_LOGIN, USER_ERROR, USER_IS_LOGGED_IN, USER_LOGOUT } from "./types";
import base from "../firebase/firebase";

export const userRegister = user => dispatch => {
  base
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(res => {
      res.user.updateProfile({
        displayName: user.login
      });
    })
    .catch(error => {
      const warning = { message: error.message, isWarning: true };
      dispatch({
        type: USER_ERROR,
        payload: warning
      });
    })
    .then(() => {
      const warning = { message: "", isWarning: false };
      setTimeout(() => {
        dispatch({
          type: USER_ERROR,
          payload: warning
        });
      }, 2000);
    });
};

export const userLogout = () => dispatch =>{
	base
		.auth()
    .signOut()
		.then(() => {
			dispatch({ type: USER_LOGOUT, payload: false });
		})
};

export const userLogin = user => dispatch => {
  base
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
      dispatch({
        type: USER_LOGIN,
        payload: res.user.displayName
      });
    })
    .then(() => {
      dispatch({
        type: USER_IS_LOGGED_IN,
        payload: true
      });
    })
    .catch(error => {
      const warning = { message: error.message, isWarning: true };
      dispatch({
        type: USER_ERROR,
        payload: warning
      });
    })
    .then(() => {
      const warning = { message: "", isWarning: false };
      setTimeout(() => {
        dispatch({
          type: USER_ERROR,
          payload: warning
        });
      }, 2000);
    });
};
