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
          <div
            className="ui left labeled tiny button"
            onClick={() => this.props.removeFromCart(photo._id)}
          >
            <div className="ui olive label">IN CART</div>
            <div className="ui icon olive button">
              <i className="ui icon check" />
            </div>
          </div>
        ) : (
          <div
            className="ui left labeled tiny button"
            onClick={() => this.props.addToCart(photo)}
          >
            <div className="ui label">ADD TO CART</div>
            <div className="ui icon button">
              <i className="ui icon plus" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { cart: state.cart };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (photo) => {
      dispatch(addToCart(photo));
    },
    removeFromCart: (photoId) => {
      dispatch(removeFromCart(photoId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckInCartButton);
