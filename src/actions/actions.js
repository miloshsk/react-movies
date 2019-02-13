import { LOADING } from "./types";

export const showSpinner = loaded => dispatch => {
  dispatch({
    type: LOADING,
    payload: loaded
  });
};
