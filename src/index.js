import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import "./assets/css/styles.css";
import configureStore from "./redux/configureStore.dev";
import { Provider as ReduxProvider } from "react-redux";
import { createRoot } from "react-dom/client";

const store = configureStore();
const domContainer = document.querySelector("#app");
const root = createRoot(domContainer);
root.render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>
);
