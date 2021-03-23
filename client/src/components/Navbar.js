import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";

const CustomNavbar = (props) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <LinkContainer to="/search">
        <Navbar.Brand>Google Books Search</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" activeKey="/">
          <IndexLinkContainer to="/search">
            <Nav.Link active={false}>Search</Nav.Link>
          </IndexLinkContainer>
          <IndexLinkContainer to="/saved">
            <Nav.Link active={false}>Saved Books</Nav.Link>
          </IndexLinkContainer>
        </Nav>
        <Nav>
        <button onClick={() => props.onSignOutClick(props.history)} className="btn btn-danger">
        <i className="fab fa-google mr-1"></i>
        Sign Out
      </button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
