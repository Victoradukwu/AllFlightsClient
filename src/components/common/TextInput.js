import React from "react";
import PropTypes from "prop-types";

const TextInput = ({ name, label, onChange, placeholder, value, extraClasses, readonly }) => {
  const cssClasses = `form-group ${extraClasses}`
  return (

    <div className={cssClasses}>
      <label>{label}:</label>
        <input
          className="form-control form-control-sm"
          formcontrolname={name}
          type="text"
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readonly}
        />
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
  extraClasses: PropTypes.string,
  readonly: PropTypes.bool
};

export default TextInput;
