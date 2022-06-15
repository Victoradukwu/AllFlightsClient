import { actionTypes } from "../actions/actionTypes";
import initialState from "./initialState";

const flightReducer = (state = initialState.flights, action) => {
  switch (action.type) {
    case actionTypes.LIST_FLIGHTS_SUCCESS:
      return action.flights;
    case actionTypes.PAGE_COUNT_UPDATE:
      return { ...state, ...action.pageCount };
    default:
      return state;
  }
};

export default flightReducer;
