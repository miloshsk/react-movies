import { MENU_TOGGLE } from "../actions/types";

const initialState = {
  isMenuOpen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MENU_TOGGLE:
      return {
        ...state,
        isMenuOpen: action.payload
      };
    default:
      return state;
  }
}
