import {handleError, handleResponse} from "./apiUtils";
const baseUrl = `${process.env.API_URL}/auth/`;

export const login = (data) => {
  return fetch(`${baseUrl}login/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
};

export const logout = () => {
  return fetch(`${baseUrl}logout/`, {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${localStorage.getItem('token')}`
    }
  })
    .then(handleResponse)
    .catch(handleError);
};

export const changePassword = (data) => {
  return fetch(`${baseUrl}change-password/`, {
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data),
    method: "POST",
  })
    .then(handleResponse)
    .catch(handleError);
};

export const passwordResetInit = (email) => {
  return fetch(`${baseUrl}initiate-password-reset/${email}`, {
    headers: {
      "content-type": "application/json"
    }
  })
    .then(handleResponse)
    .catch(handleError);
};

export const passwordResetComplete = (data) => {
  return fetch(`${baseUrl}complete-password-reset/`, {
    headers: {"content-type": "application/json"},
    body: JSON.stringify(data),
    method: "POST",
  })
    .then(handleResponse)
    .catch(handleError);
};
