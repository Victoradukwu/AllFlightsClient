import React, {useState} from "react";
import ResetPasswordForm from "./ResetPasswordForm";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
import {passwordResetInit} from "../../services/authServices";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault()
    passwordResetInit(email)
      .then(() => {
        toast.success("Password reset initiated");
        navigate('/auth/reset-intermediate');
      })
      .catch((error) => {
        toast.error("Failed. " + error);
      });
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <main>
      <div className="card shadow-lg mx-auto">
        <div className="card-header text-center">
          <h4>Password Reset</h4>
        </div>
        <div className="card-body container">
          <ResetPasswordForm onChange={handleChange} onSubmit={handleSubmit} email={email}/>
        </div>
        <hr />
      </div>
    </main>
  );
};

export default ResetPasswordPage;
