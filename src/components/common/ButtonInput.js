import React from "react";
import PropTypes from "prop-types";

const ButtonInput = ({ children, handleClick, btnClasses}) => {
  return (

    <div style={{margin: "8px"}}>
      <button className={btnClasses} onClick={handleClick}>
        {children}
      </button>
    </div>
  );
};

ButtonInput.propTypes = {
  children: PropTypes.any.isRequired,
  handleClick: PropTypes.func,
  btnClasses: PropTypes.string.isRequired
};

export default ButtonInput;
