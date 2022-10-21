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

export const passwordChangeSuccess = () => {
  return {
    type: actionTypes.PW_CHANGE_SUCCESS
  };
};

export const registerSuccess = (loggedInUser) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
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
        throw error;
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    return authServices
      .logout()
      .then(() => {
        dispatch(logoutSuccess());
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const changePassword = (data) => {
  return (dispatch) => {
    return authServices
      .changePassword(data)
      .then(() => {
        dispatch(passwordChangeSuccess());
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const register = (data) => {
  return (dispatch) => {
    return authServices
      .userRegister(data)
      .then((resp) => {
        dispatch(registerSuccess(resp));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const socialLogin = (data) => {
  return (dispatch) => {
    return authServices
      .socialLogin(data)
      .then((resp) => {
        dispatch(logInSuccess(resp));
      })
      .catch((error) => {
        throw error;
      });
  };
};
