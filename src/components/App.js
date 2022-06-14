import React from "react";
import NavBar from "./common/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopBar from "./common/TopBar";
import Footer from "./common/Footer";

const App = () => (
  <div className="container-fluid me-auto" style={{ width: "100%" }}>
    <TopBar />
    <NavBar />
    <Footer />
    <ToastContainer autoClose={3000} hideProgressBar />
  </div>
);

export default App;
