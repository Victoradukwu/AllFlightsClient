import { combineReducers } from "redux";
import flights from "./flightReducer";

const rootReducer = combineReducers({ flights: flights });

export default rootReducer;
