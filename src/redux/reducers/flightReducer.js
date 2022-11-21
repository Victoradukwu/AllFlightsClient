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
    case actionTypes.DELETE_FLIGHT_SUCCESS:
      return {
        ...state,
        flights: state.flights.filter((flight) => flight.id === action.flight_id
      )}
    case actionTypes.UPDATE_FLIGHT_SUCCESS:
      return {
        ...state,
        flights: state.flights.map((flight) =>
        flight.id === action.flight.id ? action.flight : flight
      )}
    case actionTypes.BOOK_TICKET_SUCCESS:
      return {
        ...state,
        own_tickets: action.tickets,
        ticket_message: action.ticket_message
      }
    default:
      return state;
  }
};

export default flightReducer;
