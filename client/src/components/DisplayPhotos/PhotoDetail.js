import React from "react";
import { connect } from "react-redux";
import { unselectPhoto } from "../../actions";
import CheckInCartButton from "./CheckInCartButton";

class PhotoDetail extends React.Component {
  componentWillUnmount() {
    this.props.unselectPhoto();
  }
  render() {
    const { photo } = this.props.selectPhoto;
    return (
      <div className="ui container">
        <button
          className="ui labeled icon tiny button"
          onClick={() => this.props.unselectPhoto()}
        >
          <i className="left arrow icon"></i>
          ALL PHOTOS
        </button>
        <div style={{ float: "right" }}>
          <CheckInCartButton photo={photo}></CheckInCartButton>
        </div>
        <img
          className="ui centered large image"
          src={photo.source}
          alt={photo.name}
        ></img>
        <div style={{ textAlign: "center" }}>
          <h3>{photo.name}</h3>
          <p>Tags: {photo.tags}</p>
        </div>
      </div>
    );
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
  return {
    selectPhoto: state.selectPhoto,
    unselectPhoto: state.unselectPhoto
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetail);
