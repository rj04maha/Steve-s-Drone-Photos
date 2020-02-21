import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//import { addToCart, removeFromCart } from "../actions";
import CartItem from "./CartItem";

class Cart extends React.Component {
  render() {
    if (this.props.cart.length > 0) {
      return (
        <div className="ui container space">
          <h2 className="ui huge header">Your cart</h2>

          <table className="ui unstackable celled table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Description</th>
                <th>Digital Copy</th>
                <th>Printed Copy</th>
              </tr>
            </thead>
            <tbody>
              {this.props.cart.map(image => (
                <CartItem photo={image.photo} key={image.photo.id}></CartItem>
              ))}
            </tbody>
          </table>

          <Link to="/checkout">
            <button className="ui right floated huge button">
              <i className="cart icon"></i>Checkout
            </button>
          </Link>
          <h1>Total: $100</h1>
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
  }
}

const mapStateToProps = state => {
  return { cart: state.cart };
};
export default connect(mapStateToProps)(Cart);
