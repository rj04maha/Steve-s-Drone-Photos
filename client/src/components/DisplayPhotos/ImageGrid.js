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
        <div className="ui compact menu">
          <div className="ui simple dropdown item">
            Filter
            <i className="dropdown icon"></i>
            <div className="menu">
              <div className="item">Albany</div>
              <div className="item">European Cities</div>
              <div className="item">Group Photo</div>
            </div>
          </div>
        </div>

        <div className="image-list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { photos: state.photos, cart: state.cart };
};

export default connect(mapStateToProps)(ImageGrid);
