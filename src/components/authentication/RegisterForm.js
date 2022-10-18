import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import PasswordInput from "../common/PasswordInput";
import ImageInput from "../common/ImageInput";

const RegisterForm = ({onChange, onSubmit, user}) => {

  return (

    <form onSubmit={onSubmit}>

      <div className="row">
        <TextInput
        label={"First Name"}
        onChange={onChange}
        name={"firstName"}
        value={user.firstName}
        extraClasses={"col-md"}
        placeholder={"Enter first name"}
      />
      <TextInput
        label={"Last Name"}
        onChange={onChange}
        name={"lastName"}
        value={user.lastName}
        extraClasses={"col-md"}
        placeholder={"Enter last name"}
      />
      </div>

      <div className="row">
        <TextInput
        label={"Email"}
        onChange={onChange}
        name={"email"}
        value={user.email}
        extraClasses={"col-md"}
        placeholder={"Enter email"}
      />
      <TextInput
        label={"Phone Number"}
        onChange={onChange}
        name={"phoneNumber"}
        value={user.phoneNumber}
        extraClasses={"col-md"}
        placeholder={"Enter phone number"}
      />
      </div>

      <div className="row">
        <PasswordInput
        label={"Password"}
        onChange={onChange}
        name={"password"}
        value={user.password}
        extraClasses={"col-md"}
        placeholder={"Enter password"}
      />
      <PasswordInput
        label={"Confirm Password"}
        onChange={onChange}
        name={"confirmPassword"}
        value={user.confirmPassword}
        extraClasses={"col-md"}
        placeholder={"Re-enter the password"}
      />
      </div>
      <ImageInput
        label={"Avatar"}
        onChange={onChange}
        name={"avatarFile"}
        // value={user.avatarFile}
        placeholder={"Upload your image"}
      />


      <small>Already registered? Please <a href="/auth/login">sign in</a> to
        continue.</small>
      <div>
        <button className="btn float-left" type="submit">Submit</button>
      </div>
    </form>
  );
};

RegisterForm.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterForm;
