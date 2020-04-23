import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartForm from "./CartForm";
import { removeFromCart } from "../../actions";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const [photos, setPhotos] = useState({});

  useEffect(() => {
    setPhotos(Object.values(cart));
  }, [cart]);

  if (Object.keys(photos).length > 0) {
    return (
      <div className="ui container">
        <h1>Cart</h1>
        <CartForm
          key={photos}
          photos={photos}
          button="Checkout"
          checkoutButton={props.onSubmit}
          setMasterStates={props.setMasterStates}
          removeFromCart={removeFromCart}
        />
      </div>
    );
  } else {
    return (
      <div>
        <div className="ui container space">
          <h2 className="ui huge header">Your cart</h2>
          <p>Your cart is empty please select photos to order</p>
          <Link to="/photos">
            <button className="ui button">
              Check them out here<i className="right chevron icon"></i>
            </button>
          </Link>
        </div>
      </div>
    );
  }
};

export default Cart;
