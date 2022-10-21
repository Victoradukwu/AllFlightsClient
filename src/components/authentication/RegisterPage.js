import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import PropTypes from "prop-types";
import RegisterForm from "./RegisterForm";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faGoogle} from "@fortawesome/free-brands-svg-icons";
import SocialButton from "../common/SocialButton";
import {useGoogleLogin} from "@react-oauth/google";
// import Loader from "rsuite/Loader";

const RegisterPage = ({register, auth, socialLogin}) => {
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
          <RegisterForm onChange={handleChange} onSubmit={handleSubmit} user={user}/>
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

RegisterPage.propTypes = {
  auth: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  socialLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = {
  register: authActions.register,
  socialLogin: authActions.socialLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
