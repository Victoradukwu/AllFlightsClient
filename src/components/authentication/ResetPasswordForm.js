import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const ResetPasswordForm = ({onChange, onSubmit, email}) => {

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        label={"Email"}
        onChange={onChange}
        name={"email"}
        value={email}
      />
      <div>
        <button className="btn float-left" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

ResetPasswordForm.propTypes = {
  email: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ResetPasswordForm;
