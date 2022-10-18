import React from "react";
import PropTypes from "prop-types";

const PasswordInput = ({ name, label, onChange, placeholder, value, extraClasses }) => {
  const cssClasses = `form-group ${extraClasses}`
  return (

    <div className={cssClasses}>
      <label>{label}:
        <input
          className="form-control form-control-sm"
          formcontrolname={name}
          type="password"
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  extraClasses: PropTypes.string
};

export default PasswordInput;
