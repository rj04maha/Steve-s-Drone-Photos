import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const cart = useSelector(state => state.cart, shallowEqual);

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand>
        <Link className="navbar-brand" to="/">
          <img
            className="ui medium image logo"
            src="/images/logo.png"
            alt="Drone Photography by Steve Balogh"
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/photos" className="nav-link">
              PHOTOS
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/about" className="nav-link">
              ABOUT
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/contact" className="nav-link">
              CONTACT
            </Link>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link>
            <div className="navbar checkout_button">
              <div className="ui compact menu">
                <Link to="/cart" className="item">
                  {Object.keys(cart).length > 0 ? (
                    <div>
                      <i className="icon large olive cart"></i> CHECKOUT
                      <div className="floating ui olive label">
                        {Object.keys(cart).length}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <i className="icon large cart"></i> YOUR CART IS EMPTY
                    </div>
                  )}
                </Link>
              </div>
            </div>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
