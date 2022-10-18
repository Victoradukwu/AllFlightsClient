import React from "react";
import PropTypes from "prop-types";

const ImageInput = ({ name, label, onChange, placeholder, extraClasses }) => {
  const cssClasses = `form-group ${extraClasses}`
  return (
    <div className={cssClasses}>
      <label htmlFor={name}>{label}:
        <input
          name={name}
          id = {name}
          placeholder={placeholder}
          // value={value}
          onChange={onChange}
          accept="image/*"
          className="form-control form-control-sm"
          formcontrolname={name}
          type="file"
        />
        <span className="invalid-feedback"> Please upload your picture. </span>
      </label>
    </div>
  );
};

ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  // value: PropTypes.string,
  error: PropTypes.string,
  extraClasses: PropTypes.string
};

export default ImageInput;
