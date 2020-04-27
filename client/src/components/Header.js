import React from "react";
import { useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const Header = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      bg="light"
      variant="light"
      sticky="top"
    >
      <Navbar.Brand>
        <Link to="/">
          <img
            className="ui medium image logo"
            src="/images/logo.png"
            alt="Drone Photography by Steve Balogh"
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav text-center">
        <Nav className="mr-auto">
          <Link to="/photos" className="nav-link">
            PHOTOS
          </Link>
          <Link to="/about" className="nav-link">
            ABOUT
          </Link>
          <Link to="/contact" className="nav-link">
            CONTACT
          </Link>
        </Nav>

        <Nav>
          <div className="navbar">
            <div className="ui compact menu">
              <Link to="/cart" className="item">
                {Object.keys(cart).length > 0 ? (
                  <div>
                    <i className="icon large olive cart"></i>
                    <div className="floating ui olive label">
                      {Object.keys(cart).length}
                    </div>
                  </div>
                ) : (
                  <div>
                    <i className="icon large cart"></i>
                  </div>
                )}
              </Link>
            </div>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
