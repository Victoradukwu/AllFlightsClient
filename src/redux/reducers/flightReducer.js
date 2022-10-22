import { actionTypes } from "../actions/actionTypes";
import initialState from "./initialState";

const flightReducer = (state = initialState.flights, action) => {
  switch (action.type) {
    case actionTypes.LIST_FLIGHTS_SUCCESS:
      return {
        ...state,
        flights: action.flights,
        pageCount: action.pageCount,
        count: action.count,
        numberOfPages: action.numberOfPages
      };
    case actionTypes.SCHEDULE_FLIGHT_SUCCESS:
      return [...state.flights, action.flight]
    default:
      return state;
  }
};

export default flightReducer;
