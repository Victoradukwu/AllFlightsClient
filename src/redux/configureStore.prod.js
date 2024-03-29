import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

const configureStore = (initialState) =>
  createStore(rootReducer, initialState, applyMiddleware(thunk));

export default configureStore;
