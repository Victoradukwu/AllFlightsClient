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

export const pageCountUpdate = (pageCount) => {
  return {
    type: actionTypes.PAGE_COUNT_UPDATE,
    pageCount: pageCount,
  };
};

//Thunks
export const listFlights = () => {
  return (dispatch) => {
    return flightsServices
      .listFlights()
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

//
// export const deleteCourse = (course) => {
//   return (dispatch) => {
//     dispatch(deleteCourseOptimistic(course));
//     return courseApi.deleteCourse(course.id);
//   };
// };
