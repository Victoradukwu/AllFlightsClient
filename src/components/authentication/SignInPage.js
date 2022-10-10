import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import PropTypes from "prop-types";
import SignInForm from "./SignInForm";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
// import Loader from "rsuite/Loader";

const SignInPage = ({logIn, auth}) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});


  const setToken = () =>{
    const token = auth.user?auth.user.accessToken:''
    localStorage.setItem('token', token)
  }

  useEffect(setToken, [auth.user])

  const handleSubmit = (event) => {
    event.preventDefault()
    logIn(user)
      .then(() => {
        toast.success("Successfully signed in");
      })
      .then(() => navigate('/'))
      .catch((error) => {
        toast.error("Login failed. " + error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  return (
    <main>
      <div className="card shadow-lg mx-auto">
        <div className="card-header text-center">
          <h4>Please sign in to continue</h4>
        </div>
        <div className="card-body container">
          <SignInForm onChange={handleChange} onSubmit={handleSubmit} user={user}/>
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
