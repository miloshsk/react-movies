import { MENU_TOGGLE } from "./types";

export const menuToggle = isOpened => dispatch => {
  dispatch({
    type: MENU_TOGGLE,
    payload: isOpened
  });
};
