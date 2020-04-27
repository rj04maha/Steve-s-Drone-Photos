import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderComplete = () => {
  const photos = useSelector((state) => state.submitOrder);

  console.log(photos);
  if (photos) {
    return (
      <div className="ui container space">
        <h2 className="ui huge header">
          Thank you, {photos.firstName} {photos.lastName}!
        </h2>
        <h3>Order #{photos._id}</h3>
        <p>Please keep your order number for your records.</p>
        <p>
          Please check your email address: <strong>{photos.email}</strong> for
          confirmation and payment instructions.
        </p>
      </div>
    );
  } else {
    return (
      <div className="ui container space">
        <h2 className="ui huge header">No order palced</h2>
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
