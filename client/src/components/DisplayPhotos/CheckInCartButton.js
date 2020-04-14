import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { addToCart, removeFromCart } from "../../actions";

class CheckInCartButton extends React.Component {
  render() {
    const { photo, cart } = this.props;
    return (
      <div>
        {_.has(cart, photo._id) ? (
          <button
            className="ui olive tiny right labeled icon button"
            onClick={() => this.props.removeFromCart(photo._id)}
          >
            IN CART
            <i className="white big check icon link"></i>
          </button>
        ) : (
          <button
            className="ui right labeled icon tiny button"
            onClick={() => this.props.addToCart(photo)}
          >
            ADD TO CART
            <i className="big plus circle icon link"></i>
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { cart: state.cart };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: photo => {
      dispatch(addToCart(photo));
    },
    removeFromCart: photoId => {
      dispatch(removeFromCart(photoId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckInCartButton);
