import { combineReducers } from "redux";
import flightReducer from "./flightReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  flight: flightReducer,
  auth: authReducer,
});

export default rootReducer;
