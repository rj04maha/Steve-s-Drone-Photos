import React from "react";
import { connect } from "react-redux";
import { addToCart, removeFromCart, unselectPhoto } from "../../actions";

class PhotoDetail extends React.Component {
  componentWillUnmount() {
    this.props.unselectPhoto();
  }
  render() {
    return (
      <div className="ui container">
        <button
          className="ui labeled icon button"
          onClick={() => this.props.unselectPhoto()}
        >
          <i className="left arrow icon"></i>
          BACK
        </button>
        {this.props.cart.filter(
          e => e.photo.id === this.props.selectPhoto.photo.id
        ).length > 0 ? (
          <button
            className="ui right floated right labeled icon olive button icon-button-cart"
            onClick={() =>
              this.props.removeFromCart(this.props.selectPhoto.photo.id)
            }
          >
            <i className="white big check icon link"></i>IN CART
          </button>
        ) : (
          <button
            className="ui right floated right labeled icon button icon-button"
            onClick={() => this.props.addToCart(this.props.selectPhoto.photo)}
          >
            <i className="big plus circle icon link"></i>ADD TO CART
          </button>
        )}

        <img
          className="ui centered large image"
          src={this.props.selectPhoto.photo.urls.regular}
          alt={this.props.selectPhoto.photo.description}
        ></img>
        <p style={{ textAlign: "center" }}>
          This will be a description of the pic and tags
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: photo => {
      dispatch(addToCart(photo));
    },
    removeFromCart: photoId => {
      dispatch(removeFromCart(photoId));
    },
    unselectPhoto: () => {
      dispatch(unselectPhoto());
    }
  };
};

const mapStateToProps = state => {
  return {
    selectPhoto: state.selectPhoto,
    unselectPhoto: state.unselectPhoto,
    cart: state.cart
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetail);
