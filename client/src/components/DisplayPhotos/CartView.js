import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeFromCart } from "../../actions";
import "./CartView.css";

class CartView extends React.Component {
  emptyCart() {
    this.props.cart.map(image => {
      return this.props.removeFromCart(image.photo.id);
    });
  }
  getCart() {
    const cartTotal =
      this.props.cart.length > 0 ? (
        <div>
          <div className="">
            {
              <button
                onClick={() => {
                  if (
                    window.confirm("Are you sure you wish to empty your cart?")
                  ) {
                    this.emptyCart();
                  }
                }}
                className="ui right floated basic red button"
              >
                Empty cart
              </button>
            }
            {this.props.cart.map(image => {
              return (
                <div
                  key={image.photo.id}
                  style={{ float: "left" }}
                  className="img"
                >
                  <img
                    className="ui tiny image"
                    src={image.photo.urls.regular}
                    alt={image.photo.description}
                  />
                  <div
                    className="delete-button"
                    onClick={() => this.props.removeFromCart(image.photo.id)}
                  >
                    <i className="x link small circular inverted icon"></i>
                  </div>
                </div>
              );
            })}
          </div>
          <Link to="/cart">
            <button className="fluid ui button">
              Change quantity of photos & checkout
            </button>
          </Link>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h4>Please select which images you would like to order</h4>
        </div>
      );

    return <div>{cartTotal}</div>;
  }

  render() {
    return (
      <div className="ui-sticky">
        <div className="ui segment">{this.getCart()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: photoId => {
      dispatch(removeFromCart(photoId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartView);
