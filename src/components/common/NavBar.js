import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const NavBar = ({auth}) => {
  const userName = ()=>{
    if (auth.user){return auth.user.user.firstName+' '+ auth.user.user.lastName;}
    else {return null;}

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
                <NavDropdown.Item href="#action/3.1">
                  Deactivate User
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Update Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
              </NavDropdown>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavBar.propTypes = {
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(NavBar);
