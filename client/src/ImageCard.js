import React from "react";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../actions";
import UnselectedStar from "./UnselectedStar";
import SelectedStar from "./SelectedStar";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spans: 0
    };
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.setSpans);
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight;
    const spans = Math.ceil(height / 10) + 1;
    this.setState({ spans });
  };

  render() {
    const { description, urls, id } = this.props.image;
    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
        <div className="card">
          <img
            alt={description}
            src={urls.regular}
            ref={this.imageRef}
            key={id}
          />
          <div className="edit">
            {this.props.inCart ? (
              <button
                className="icon-button-cart"
                onClick={() => this.props.removeFromCart(id)}
              >
                <SelectedStar />
              </button>
            ) : (
              <button
                className="icon-button"
                onClick={() => this.props.addToCart(this.props.image)}
              >
                <UnselectedStar />
              </button>
            )}
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageCard);
