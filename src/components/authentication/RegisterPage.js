import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import PropTypes from "prop-types";
import RegisterForm from "./RegisterForm";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
// import Loader from "rsuite/Loader";

const RegisterPage = ({register, auth}) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});


  const setToken = () =>{
    const token = auth.user?auth.user.accessToken:''
    localStorage.setItem('token', token)
  }

  useEffect(setToken, [auth.user])

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = new FormData()
    for (const key in user) {
  form.append(key, user[key])
}
    register(form)
      .then(() => {
        toast.success("Successfully registered");
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
      [name]: name === "avatarFile" ? event.target.files[0] : value, // The JS Computed Property syntax enables us to the PROPERTY `name` as a VARIABLE in the ternary operator on the right hand
    }));
  };

  return (
    <main>
      <div className="card shadow-lg mx-auto">
        <div className="card-header text-center">
          <h4>Please sign in to continue</h4>
        </div>
        <div className="card-body container">
          <RegisterForm onChange={handleChange} onSubmit={handleSubmit} user={user}/>
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

RegisterPage.propTypes = {
  auth: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = {
  register: authActions.register
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
