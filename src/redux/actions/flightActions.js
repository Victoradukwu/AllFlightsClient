import { actionTypes } from "./actionTypes";
import * as flightsServices from "../../services/flightServices";

// ActionCreators
export const listFlightsSuccess = (flights, pageCount, count) => {
  return {
    type: actionTypes.LIST_FLIGHTS_SUCCESS,
    flights: flights,
    pageCount: pageCount,
    count: count,
  };
};

export const scheduleFlightSuccess = (flight) => {
  return {
    type: actionTypes.SCHEDULE_FLIGHT_SUCCESS,
    flight: flight
  };
};

export const pageCountUpdate = (pageCount) => {
  return {
    type: actionTypes.PAGE_COUNT_UPDATE,
    pageCount: pageCount,
  };
};

//Thunks
export const listFlights = (page = 1) => {
  return (dispatch) => {
    return flightsServices
      .listFlights(page)
      .then((resp) => {
        dispatch(
          listFlightsSuccess(resp.results, resp.numberOfPages, resp.count)
        );
      })
      .catch((error) => {
        throw error;
      });
  };
};


export const scheduleFlight = (flight) => {
  return (dispatch) => {
    return flightsServices
      .scheduleFlight(flight)
      .then((resp) => {
        dispatch(
          scheduleFlightSuccess(resp.results)
        );
      })
      .catch((error) => {
        throw error;
      });
  };
};
