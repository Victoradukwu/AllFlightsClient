import { actionTypes } from "./actionTypes";
import * as authServices from "../../services/authServices";

// ActionCreators
export const logInSuccess = (loggedInUser) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    loggedInUser: loggedInUser,
  };
};

//Thunks
export const login = (data) => {
  return (dispatch) => {
    return authServices
      .login(data)
      .then((resp) => {
        dispatch(logInSuccess(resp));
      })
      .catch((error) => {
        //TODO dispatch a LOGIN_FAILURE action here
        throw error;
      });
  };
};
