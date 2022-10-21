import React from "react";
import PropTypes from "prop-types";
import SocialLogin from "react-social-login";

const SocialButton = ({ children, triggerLogin, btnClasses, ...props}) => {
  return (

    <div style={{margin: "8px"}}>
      <button className={btnClasses} onClick={triggerLogin} {...props}>
        {children}
      </button>
    </div>
  );
};

SocialButton.propTypes = {
  children: PropTypes.any.isRequired,
  triggerLogin: PropTypes.func,
  btnClasses: PropTypes.string.isRequired
};

export default SocialLogin(SocialButton);
