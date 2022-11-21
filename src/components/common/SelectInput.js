import React from "react";
import PropTypes from "prop-types";

const SelectInput = ({
  name,
  label,
  onChange,
  defaultOption,
  identifier,
  display,
  options,
  extraClasses
}) => {
  return (
    <div className={extraClasses}>
      {label?<label htmlFor={name}>{label}:</label>:null}
        <select
          name={name}
          identifier={identifier}
          display={display}
          onChange={onChange}
          className="form-control form-control-sm"
        >
          <option value="">{defaultOption}</option>
          {options.map((option) => {
            return (
              <option key={option[identifier]} value={option[identifier]}>
                {option[display]}
              </option>
            );
          })}
        </select>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  identifier: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(PropTypes.object),
  display: PropTypes.string.isRequired,
  extraClasses: PropTypes.string
};

export default SelectInput;
