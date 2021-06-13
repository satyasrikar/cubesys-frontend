import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../../assets/img/logo.png";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import "./Header.comp.css";

import { FiLogOut } from "react-icons/fi";
import { userLogout } from "../../api/userApi";

export const Header = () => {
  const history = useHistory();

  const logMeOut = () => {
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("crmSite");
    userLogout();
    history.push("/");
  };

  return (
    <>
      <div className="backdrop">
        <Navbar collapseOnSelect bg="dark" variant="dark" expand="md">
          <Navbar.Brand style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="logo" width="50px" />
            <h4 className="ml-2">Cubesys CRM</h4>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/dashboard">
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/tickets">
                <Nav.Link>Tickets</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/stats">
                <Nav.Link>Statistics</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/profile">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>

              <Nav.Link onClick={logMeOut}>
                Logout
                {"  "}
                <FiLogOut />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};
