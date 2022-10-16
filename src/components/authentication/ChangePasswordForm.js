import React from "react";
import PropTypes from "prop-types";
import PasswordInput from "../common/PasswordInput";

const ChangePasswordForm = ({onChange, onSubmit, data}) => {

  return (
    <form onSubmit={onSubmit}>
      <PasswordInput
        label={"Old Password"}
        onChange={onChange}
        name={"oldPassword"}
        value={data.oldPassword}
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

ChangePasswordForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
