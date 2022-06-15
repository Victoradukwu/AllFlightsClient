import { actionTypes } from "./actionTypes";
import * as flightsServices from "../../services/flightServices";

// ActionCreators
export const listFlightsSuccess = (flights) => {
  return {
    type: actionTypes.LIST_FLIGHTS_SUCCESS,
    flights: flights,
  };
};

// export const createCourseSuccess = (course) => {
//   return {
//     type: actionTypes.CREATE_COURSE_SUCCESS,
//     course: course,
//   };
// };
//
// export const updateCourseSuccess = (course) => {
//   return {
//     type: actionTypes.UPDATE_COURSE_SUCCESS,
//     course: course,
//   };
// };

// export const deleteCourseOptimistic = (course) => {
//   return {
//     type: actionTypes.DELETE_COURSE_OPTIMISTIC,
//     course: course,
//   };
// };

//Thunks
export const listFlights = () => {
  return (dispatch) => {
    // dispatch(beginApiCall());
    return flightsServices
      .listFlights()
      .then((resp) => {
        dispatch(listFlightsSuccess(resp.results));
      })
      .catch((error) => {
        // dispatch(apiCallError(error));
        throw error;
      });
  };
};

// export const saveCourse = (course) => {
//   return (dispatch) => {
//     //In addition to `dispatch, this function takes a second argument (getState) to enable us get the values from the store
//     dispatch(beginApiCall());
//     return courseApi
//       .saveCourse(course)
//       .then((savedCourse) => {
//         course.id
//           ? dispatch(updateCourseSuccess(course))
//           : dispatch(createCourseSuccess(savedCourse));
//       })
//       .catch((error) => {
//         dispatch(apiCallError(error));
//         throw error;
//       });
//   };
// };
//
// export const deleteCourse = (course) => {
//   return (dispatch) => {
//     dispatch(deleteCourseOptimistic(course));
//     return courseApi.deleteCourse(course.id);
//   };
// };
