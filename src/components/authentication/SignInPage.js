import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import PropTypes from "prop-types";
import SignInForm from "./SignInForm";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
// import Loader from "rsuite/Loader";

const SignInPage = ({logIn}) => {
  const navigate = useNavigate();
  useEffect(() => {
    document.addEventListener("formSubmit", userLogIn);
  }, []);

  const userLogIn = (event) => {
    const data = event.detail.data;
    logIn(data)
      .then(() => {
        toast.success("Successfully signed in");
      })
      .then(() => navigate('/'))
      .catch((error) => {
        toast.error("Login failed. " + error);
      });
  };
  return (
    <main>
      <div className="card shadow-lg mx-auto">
        <div className="card-header text-center">
          <h4>Please sign in to continue</h4>
        </div>
        <div className="card-body container">
          <SignInForm />
        </div>
        <hr />
        <div style={{ margin: "8px" }}>
          <button className="btn btn-social btn-facebook">
            <span className="fa fa-facebook" aria-hidden="true"></span> Continue
            with Facebook
          </button>
        </div>
        <div style={{ margin: "8px" }}>
          <button className="btn btn-social btn-google">
            <span className="fa fa-google" aria-hidden="true"></span> Continue
            with Google
          </button>
        </div>
      </div>
    </main>
  );
};

SignInPage.propTypes = {
  auth: PropTypes.object.isRequired,
  logIn: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = {
  logIn: authActions.login
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
