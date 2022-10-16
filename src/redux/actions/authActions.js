import { actionTypes } from "./actionTypes";
import * as authServices from "../../services/authServices";

// ActionCreators
export const logInSuccess = (loggedInUser) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    loggedInUser: loggedInUser,
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS
  };
};

export const logoutError = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS
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
        //TODO dispatch a LOGIN_ERROR action here
        throw error;
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    return authServices
      .logout()
      .then((resp) => {
        dispatch(logoutSuccess(resp));
      })
      .catch((error) => {
        throw error;
      });
  };
};
