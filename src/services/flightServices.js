import { handleResponse, handleError } from "./apiUtils";
const baseUrl = `${process.env.API_URL}/flights/`;

export const listFlights = (page) => {
  return fetch(`${baseUrl}?page=${page}`)
    .then(handleResponse)
    .catch(handleError);
};

export const scheduleFlight = (flight) => {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(flight),
  })
    .then(handleResponse)
    .catch(handleError);
};

export const updateFlight = (course) => {
  return fetch(`${baseUrl}${course.id}/`, {
    method: "PATCH",
    headers: { "content-type": "application/json", "Authorization": `Token ${localStorage.getItem('token')}` },
    body: JSON.stringify(course),
  })
    .then(handleResponse)
    .catch(handleError);
};

export const deleteFlight = (course) => {
  return fetch(`${baseUrl}course.id/`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(course),
  })
    .then(handleResponse)
    .catch(handleError);
};
