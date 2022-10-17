import React from "react";
import PropTypes from "prop-types";
import PasswordInput from "../common/PasswordInput";
import TextInput from "../common/TextInput";

const ResetPwCompleteForm = ({onChange, onSubmit, data}) => {

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        label={"Email"}
        onChange={onChange}
        name={"email"}
        value={data.email}
      />
      <PasswordInput
        label={"Password"}
        onChange={onChange}
        name={"password"}
        value={data.password}
      />
      <PasswordInput
        label={"Confirm password"}
        onChange={onChange}
        name={"confirmPassword"}
        value={data.confirmPassword}
      />
      <div>
        <button className="btn float-left" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

ResetPwCompleteForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ResetPwCompleteForm;
