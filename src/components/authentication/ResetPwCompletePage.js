import React, {useState} from "react";
import ResetPwCompleteForm from "./ResetPwCompleteForm";
import { toast } from "react-toastify";
import {useNavigate, useSearchParams} from 'react-router-dom';
import {passwordResetComplete} from "../../services/authServices";
// import Loader from "rsuite/Loader";

const ResetPwCompletePage = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token")
  const [data, setData] = useState({token});

  const handleSubmit = (event) => {
    event.preventDefault()
    passwordResetComplete(data)
      .then(() => {
        toast.success("Password successfully reset");
        navigate('/auth/login');
      })
      .catch((error) => {
        toast.error("Failed. " + error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <main>
      <div className="card shadow-lg mx-auto">
        <div className="card-header text-center">
          <h4>Reset Password</h4>
          <small>Please enter your email and new password to complete password reset</small>
        </div>
        <div className="card-body container">
          <ResetPwCompleteForm onChange={handleChange} onSubmit={handleSubmit} data={data}/>
        </div>
        <hr />
      </div>
    </main>
  );
};

export default ResetPwCompletePage;
