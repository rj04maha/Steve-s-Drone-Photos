import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPhoto } from "../../actions";
import PhotoForm from "./PhotoForm";

class PhotoEdit extends React.Component {
  state = { message: null };

  componentDidMount() {
    this.props.fetchPhoto(this.props.match.params.id);
  }
  onSubmit = formValues => {
    this.setState({ message: null });
    axios
      .put(`/api/photos/${formValues._id}`, formValues)
      .then(response => this.setState({ message: response }))
      .catch(err => {
        this.setState({ message: err.message });
      });
  };

  renderMessage() {
    if (this.state.message) {
      let style = "red";
      let message = "There was a problem updating this photo";
      if (this.state.message.status === 202) {
        style = "olive";
        message = this.state.message.data;
      }
      return (
        <div className={`ui ${style} message`}>
          <div className="header">{message}</div>
        </div>
      );
    }
  }
  getContent() {
    if (!this.props.photo) {
      return (
        <p>The photo with # {this.props.match.params.id} cannot be found</p>
      );
    } else {
      return (
        <PhotoForm
          onSubmit={this.onSubmit}
          button="Update"
          initialValues={this.props.photo}
          buttonEnable={true}
          img={
            <img
              src={this.props.photo.source}
              alt={this.props.photo.name}
              className="ui medium image"
            />
          }
        />
      );
    }
  }
  render() {
    return (
      <div className="ui container" style={{ paddingTop: "1em" }}>
        <Link to="/manage-photos">
          <button className="ui button right floated">
            <i className="left arrow icon"></i>Back to photos
          </button>
        </Link>
        <h1>Update Photo</h1>

        {this.getContent()}
        {this.renderMessage()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { photo: state.photos[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchPhoto })(PhotoEdit);
