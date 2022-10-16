import React from "react";
import NavBar from "./common/NavBar";
import { ToastContainer } from "react-toastify";
import ReactTooltip from "react-tooltip";
import "react-toastify/dist/ReactToastify.css";
import TopBar from "./common/TopBar";
import Footer from "./common/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlightsPage from "./flights/FlightsPage";
import "rsuite/dist/rsuite.min.css";
import SignInPage from "./authentication/SignInPage";
import ChangePasswordPage from "./authentication/ChangePasswordPage";

const App = () => (
  <div className="container-fluid me-auto" style={{ width: "100%" }}>
    <TopBar />
    <NavBar />
    <BrowserRouter>
      <ReactTooltip />
      <Routes>
        <Route path="/" element={<FlightsPage />} />
        <Route path="/auth/login" element={<SignInPage />} />
        <Route path="/auth/change-pw" element={<ChangePasswordPage />} />
      </Routes>
    </BrowserRouter>
    <Footer />
    <ToastContainer autoClose={3000} />
  </div>
);

export default App;
