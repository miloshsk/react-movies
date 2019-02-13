import {
  USER_LOGIN,
  USER_ERROR,
  USER_IS_LOGGED_IN,
  USER_LOGOUT
} from "../actions/types";

const initialState = {
  isLoggedIn: false,
  userName: "",
  error: {
    message: "",
    isWarning: false
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, userName: action.payload };
    case USER_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };
    case USER_ERROR:
      return { ...state, error: action.payload };
    case USER_LOGOUT:
      return { ...state, isLoggedIn: action.payload };
    default:
      return state;
  }
}
