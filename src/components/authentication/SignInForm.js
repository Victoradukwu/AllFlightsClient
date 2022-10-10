import React, { useState } from "react";
// import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import PasswordInput from "../common/PasswordInput";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = { email, password };

  const handleSubmit = (event) => {
    event.preventDefault();
    const submitEvent = new CustomEvent("formSubmit", {
      detail: { data: data },
    });
    document.dispatchEvent(submitEvent);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label={"Email"}
        onChange={(e) => setEmail(e.target.value)}
        name={"email"}
        value={email}
      />
      <PasswordInput
        label={"Password"}
        onChange={(e) => setPassword(e.target.value)}
        name={"password"}
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

export default SignInForm;
