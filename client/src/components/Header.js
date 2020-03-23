import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <nav
        style={{
          position: "sticky",
          top: "0",
          zIndex: "999"
        }}
        className="navbar navbar-expand-lg navbar-light bg-light"
      >
        <div className="ui container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link className="navbar-brand" to="/">
            <div className="logo">
              <img
                className="ui medium image"
                src="/images/logo.png"
                alt="Drone Photography by Steve Balogh"
              ></img>
            </div>
          </Link>

          <div
            className="collapse navbar-collapse text-center"
            id="navbarToggler"
          >
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link to="/photos" className="nav-link">
                  PHOTOS
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  ABOUT
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>

          <div className="navbar checkout_button">
            <div className="ui compact menu">
              <Link to="/cart" className="item">
                {Object.keys(this.props.cart).length > 0 ? (
                  <div>
                    <i className="icon large olive cart"></i> CHECKOUT
                    <div className="floating ui olive label">
                      {Object.keys(this.props.cart).length}
                      {
                        //this.props.cart.length}
                      }
                    </div>
                  </div>
                ) : (
                  <div>
                    <i className="icon large cart"></i> YOUR CART IS EMPTY
                  </div>
                )}
              </Link>
            </div>
            {/* 
                <div className="ui big button">
                  CART
                  {this.props.cart.length > 0 ? (
                    <div>
                      <i className="olive cart icon"></i>
                      <div className="floating ui red label"></div>
                    </div>
                  ) : (
                    <i className="grey cart icon"></i>
                  )}
                </div> */}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

export default connect(mapStateToProps)(Header);

/*

class Header extends React.Component {
  render() {
    return (
      <div className="ui-sticky">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="ui container">
            <div className="d-flex flex-grow-1">
              <span className="w-100 d-lg-none d-block"></span>

              <Link className="navbar-brand d-none d-lg-inline-block" to="/">
                <img
                  className="ui large image"
                  src="/images/logo.png"
                  alt="Drone Photography by Steve Balogh"
                ></img>
              </Link>

              <Link
                className="navbar-brand-two mx-auto d-lg-none d-inline-block"
                to="/"
              >
                <img
                  className="ui massive image"
                  src="/images/logo.png"
                  alt="Drone Photography by Steve Balogh"
                ></img>
              </Link>

              <div className="w-100 text-right">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#myNavbar"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
            </div>
            <div
              className="collapse navbar-collapse flex-grow-1 text-center"
              id="myNavbar"
            >
              <ul className="navbar-nav ml-auto flex-nowrap">
                <li className="nav-item">
                  <Link to="/photos" className="nav-link">
                    PHOTOS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">
                    ABOUT
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link">
                    CONTACT
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/cart" className="nav-link">
                    SHOPPING CART{" "}
                    {this.props.cart.length > 0 ? (
                      <div
                        style={{
                          display: "inline-block",
                          color: "#808000"
                        }}
                      >
                        <i className="large olive cart icon"></i>
                        {this.props.cart.length}
                      </div>
                    ) : (
                      <i className="large cart icon"></i>
                    )}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
*/
