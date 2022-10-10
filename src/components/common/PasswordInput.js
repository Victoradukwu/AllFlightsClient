import React from "react";
import PropTypes from "prop-types";

const TextInput = ({ name, label, onChange, placeholder, value }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
        <input
          className="form-control form-control-sm"
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

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
};

export default TextInput;
