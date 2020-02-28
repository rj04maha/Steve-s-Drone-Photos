import React from "react";
import { connect } from "react-redux";
import ImageGrid from "./ImageGrid";
import PhotoDetail from "./PhotoDetail";
import { unselectPhoto } from "../../actions";

class AllPhotos extends React.Component {
  componentDidMount() {
    this.props.unselectPhoto();
  }
  renderContent() {
    if (this.props.selectPhoto) {
      return <PhotoDetail />;
    }
    return <ImageGrid />;
  }

  render() {
    return <div className="space">{this.renderContent()}</div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    unselectPhoto: () => {
      dispatch(unselectPhoto());
    }
  };
};

const mapStateToProps = state => {
  return { selectPhoto: state.selectPhoto, unselectPhoto: state.unselectPhoto };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllPhotos);
