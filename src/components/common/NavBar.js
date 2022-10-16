import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as authActions from "../../redux/actions/authActions";
import {toast} from "react-toastify";
// import {useNavigate} from "react-router-dom";

const NavBar = ({auth, logout}) => {
  // const navigate = useNavigate();
  const userName = ()=>{
    if (auth.user){return auth.user.user.firstName+' '+ auth.user.user.lastName;}
    else {return null;}

  }

  const logOut = ()=>{
    logout()
      .then(() => {
        localStorage.removeItem('token');
        toast.success("Successfully signed out");
      })
      // .then(() => navigate('/'))
      .catch((error) => {
        toast.error("Login failed. " + error);
      });
  }

  const handleLogout = () => {
    confirmAlert({
      title: 'Confirm log out',
      message: 'Are you sure to log out?.',
      buttons: [
        {
          label: 'Yes, log out.',
          onClick: () => logOut()
        },
        {
          label: 'No, go back'
        }
      ]
    });
  };


  const adminOnlyVisibility = ()=>{
    if (auth.user && auth.user.user.roles.includes('admin')){
      return {display: 'block'}
    }else {return {display: 'none'}}
  }

  return (
    <Navbar
      bg="dark"
      sticky="top"
      variant="dark"
      expand="lg"
      style={{ width: "100vw" }}
    >
      <Container fluid>
        <Navbar.Brand href="/">AllFlights</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!auth.user ?
              <>
                <Nav.Link href="/auth/login">Sign in</Nav.Link>
                <Nav.Link href="#link">Register</Nav.Link>
              </>
              :
              <NavDropdown title={userName()} id="user-dropdown">
                <NavDropdown.Item style={adminOnlyVisibility()}>
                  Deactivate User
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Update Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item onClick={handleLogout} >Log out</NavDropdown.Item>
              </NavDropdown>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) =>{
  return {
    auth: state.auth,
  };
}

const mapDispatchToProps = {
    logout: authActions.logout
  };

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
