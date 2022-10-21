import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import PropTypes from "prop-types";
import SignInForm from "./SignInForm";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
import SocialButton from "../common/SocialButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faGoogle} from '@fortawesome/free-brands-svg-icons'
import { useGoogleLogin } from '@react-oauth/google';
// import Loader from "rsuite/Loader";

const SignInPage = ({logIn, auth, socialLogin}) => {
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

  const handleGoogleLogin = (user) => {
    const data = {backend: 'google-oauth2', accessToken: user.access_token};
    socialLogin(data)
      .then(() => {
        toast.success("Successfully signed in");
      })
      .then(() => navigate('/'))
};
  const login = useGoogleLogin({
  onSuccess: tokenResponse => handleGoogleLogin(tokenResponse),
});

  const handleFacebookLogin = (user) => {
    const data = {backend: user.provider, accessToken: user.token.accessToken};
    socialLogin(data)
      .then(() => {
        toast.success("Successfully signed in");
      })
      .then(() => navigate('/'))
};

const handleSocialLoginFailure = (err) => {
  console.error(err);
  toast.error(err);
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
        <div style={{margin: "8px"}}>
          <button className="btn btn-social btn-google" onClick={() => login()}>
            <FontAwesomeIcon icon={faGoogle} style={{marginRight: "10px"}}/> Continue with Google
          </button>
        </div>
        <SocialButton
          btnClasses={"btn btn-social btn-facebook"}
          provider="facebook"
          onLoginSuccess={handleFacebookLogin}
          onLoginFailure={handleSocialLoginFailure}
          appId={"1314353179058237"}
        >
          <FontAwesomeIcon icon={faFacebookF} style={{marginRight: "10px"}}/>
          Log in with Facebook
        </SocialButton>
      </div>
    </main>
  );
};

SignInPage.propTypes = {
  auth: PropTypes.object.isRequired,
  logIn: PropTypes.func.isRequired,
  socialLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = {
  logIn: authActions.login,
  socialLogin: authActions.socialLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
