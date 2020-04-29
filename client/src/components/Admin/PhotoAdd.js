import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field } from "redux-form";
import RenderDropzoneInput from "./RenderDropzoneInput";
import { addPhoto } from "../../actions";
import PhotoForm from "./PhotoForm";

class PhotoAdd extends React.Component {
  state = {
    initialValueName: null,
    initialValueDate: null,
    initialValueImage: null,
  };

  onSubmit = (formValues) => {
    let formData = new FormData();
    formData.append("image", formValues.image, formValues.image.name);
    formData.append("name", formValues.name);
    formData.append("tags", formValues.tags);
    formData.append("location", formValues.location);
    formData.append("dateTaken", formValues.dateTaken);
    this.props.addPhoto(formData);
  };

  onChangeInput = (n, d, i) => {
    this.setState({
      initialValueName: n,
      initialValueDate: d,
      initialValueImage: i,
    });
  };

  render() {
    return (
      <div className="ui container" style={{ paddingTop: "1em" }}>
        <Link to="/manage-photos">
          <button className="ui button right floated">
            <i className="left arrow icon"></i>To all photos
          </button>
        </Link>
        <h1>Add a photo</h1>
        <PhotoForm
          onSubmit={this.onSubmit}
          button="Upload"
          initialValues={{
            name: this.state.initialValueName,
            dateTaken: this.state.initialValueDate,
            image: this.state.initialValueImage,
          }}
          img={
            <Field
              name="image"
              component={RenderDropzoneInput}
              label="image"
              type="file"
              onChangeInput={this.onChangeInput}
            />
          }
        />
      </div>
    );
  }
}

export default connect(null, { addPhoto })(PhotoAdd);
