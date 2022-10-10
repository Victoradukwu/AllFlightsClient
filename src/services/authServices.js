import { handleError } from "./apiUtils";
const baseUrl = `${process.env.API_URL}/auth/`;

export const login = (data) => {
  return fetch(`${baseUrl}login/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .catch(handleError);
};
