import { actionTypes } from "../actions/actionTypes";
import initialState from "./initialState";

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.loggedInUser
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

export default authReducer;
