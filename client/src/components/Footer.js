import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Footer.css";

const Footer = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <>
      <div
        style={{ position: "fixed", bottom: "0", right: "0", padding: "3em" }}
        className="cart-icon"
      >
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
      <div
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          height: "6rem",
          textAlign: "center",
        }}
      >
        <div style={{ paddingTop: "50px" }}></div>
        <div className="ui inverted segment">
          <div className="ui container">
            <div className="ui two column stackable grid">
              <div className="column">
                <img
                  className="ui medium image"
                  src="/images/whitelogo.png"
                  alt="Drone Photography by Steve Balogh"
                ></img>
              </div>

              <div className="column">
                <div className="item">
                  For technical support, please contact Rachael Mahar at:
                  rachaelmahar9497@gmail.com
                </div>
                <div>
                  <Link to="/admin">Admin Access</Link>
                </div>
                <div>
                  © 2020 Drone Photography by Steve Balogh. All rights reserved
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
