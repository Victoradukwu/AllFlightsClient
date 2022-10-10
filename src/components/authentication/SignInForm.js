import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import PasswordInput from "../common/PasswordInput";

const SignInForm = ({onChange, onSubmit, user}) => {

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        label={"Email"}
        onChange={onChange}
        name={"email"}
        value={user.email}
      />
      <PasswordInput
        label={"Password"}
        onChange={onChange}
        name={"password"}
        value={user.password}
      />

      <small>
        Did you forget your password?
        <a href="./initiate-pw-reset.html">Reset it.</a>
      </small>
      <br />
      <small>
        Don&apos;t have an account? <a href="./register.html">Register</a> to
        continue.
      </small>
      <div>
        <button className="btn float-left" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

SignInForm.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SignInForm;
