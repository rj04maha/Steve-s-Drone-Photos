import React from "react";
import { connect } from "react-redux";
import ImageCard from "./ImageCard";
import "./ImageGrid.css";

class ImageGrid extends React.Component {
  renderList() {
    return this.props.photos.map(image => {
      let checkIfInCart =
        this.props.cart.filter(e => e.photo.id === image.id).length > 0;
      return <ImageCard key={image.id} image={image} inCart={checkIfInCart} />;
    });
  }

  render() {
    return (
      <div className="ui container">
        <div className="image-list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { photos: state.photos, cart: state.cart };
};

export default connect(mapStateToProps)(ImageGrid);
