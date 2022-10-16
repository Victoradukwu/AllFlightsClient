import React, {useState} from "react";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import PropTypes from "prop-types";
import ChangePasswordForm from "./ChangePasswordForm";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
// import Loader from "rsuite/Loader";

const ChangePasswordPage = ({changePassword}) => {
  const navigate = useNavigate();

  const [data, setData] = useState({});


  const clearToken = () =>{
    localStorage.removeItem('token')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    changePassword(data)
      .then(() => {
        clearToken();
        toast.success("Password successfully changed");
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
          <h4>Change Password</h4>
          <small>Please enter your new password to continue</small>
        </div>
        <div className="card-body container">
          <ChangePasswordForm onChange={handleChange} onSubmit={handleSubmit} data={data}/>
        </div>
        <hr />
      </div>
    </main>
  );
};

ChangePasswordPage.propTypes = {
  // auth: PropTypes.object.isRequired,
  changePassword: PropTypes.func.isRequired
};

// const mapStateToProps = (state) => {
//   return {
//     auth: state.auth,
//   };
// };

const mapDispatchToProps = {
  changePassword: authActions.changePassword
};

export default connect(null, mapDispatchToProps)(ChangePasswordPage);
