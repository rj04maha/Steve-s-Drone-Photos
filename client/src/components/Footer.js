import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Footer = () => {
  return (
    <div className="foot">
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
              <div className="item">Email: awfjnfnmdkl@jdnvad.com</div>
              <div>
                <Link to="/admin">Admin Access</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
