/* import React from "react";
import { connect } from "react-redux";
import ImageCard from "./ImageCard";

class ImageGrid extends React.Component {
  renderList() {
    return this.props.photos.map(image => {
      return <ImageCard key={image._id} image={image} />;
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
  return { photos: Object.values(state.photos), cart: state.cart };
};

export default connect(mapStateToProps)(ImageGrid);
 */
