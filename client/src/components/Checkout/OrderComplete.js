import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "react-share";

const OrderComplete = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const order = useSelector((state) => state.submitOrder);

  const url = "http://dronephotoserver.herokuapp.com";

  if (order) {
    const { firstName, _id, email } = order;
    return (
      <div className="ui container space">
        <h2>Order Complete</h2>
        <div className="ui placeholder segment">
          <div className="ui icon header">
            <i className="shipping fast olive icon"></i>
            <h1>Order #{_id.substr(_id.length - 5)}</h1>
            <h3>Thank you, {firstName}! </h3>
            <p>
              You will recieve a confirmation email shortly to:{" "}
              <strong>{email}</strong>
            </p>
            <p>Can't find the email? Check your spam folder.</p>
            <br />
            <br />
            <p>Please share!</p>
            <p>
              <FacebookShareButton url={url}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <FacebookMessengerShareButton>
                <FacebookMessengerIcon size={32} round />
              </FacebookMessengerShareButton>

              <EmailShareButton
                url={url}
                subject={"Check out Steve's drone pictures!"}
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
              <TwitterShareButton url={url}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <LinkedinShareButton url={url}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="ui container space">
        <h2 className="ui huge header">Place an order!</h2>
        <p>Please select photos to place an order</p>
        <Link to="/photos">
          <button className="ui button">
            Check them out here<i className="right chevron icon"></i>
          </button>
        </Link>
      </div>
    );
  }
};

export default OrderComplete;
