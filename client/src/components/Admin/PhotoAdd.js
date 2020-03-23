import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import _ from "lodash";
import { addPhoto } from "../../actions";
import RenderInput from "../Checkout/RenderInput";
import RenderDropzoneInput from "./RenderDropzoneInput";

const FIELDS = [
  { label: "Name", name: "name" },
  { label: "Tags (seperate with commas)", name: "tags" },
  { label: "Description", name: "description" }
];
class AddAPhoto extends React.Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field key={name} name={name} component={RenderInput} label={label} />
      );
    });
  }

  onSubmit = formValues => {
    let formData = new FormData();
    formData.append("image", formValues.image, formValues.image.name);
    formData.append("name", formValues.name);
    formData.append("tags", formValues.tags);
    formData.append("description", formValues.description);
    //console.log(formData);
    this.props.addPhoto(formData);
    //this.props.addPhoto(formValues);
    //console.log(formValues);
  };
  render() {
    return (
      <div className="container">
        <Link to="/admin">
          <button className="ui button right floated">Back to dashboard</button>
        </Link>
        <h1>Add a photo</h1>
        <p>*Only one photo at a time*</p>

        <form
          className="ui form"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          encType="multipart/form-data"
        >
          <Field
            name="image"
            component={RenderDropzoneInput}
            label="image"
            type="file"
          />
          {this.renderFields()}
          <button className="ui green button">Upload</button>
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};

  _.each(FIELDS, ({ name, label }) => {
    if (!formValues[name] || formValues[name].trim().length < 1) {
      errors[name] = `You must enter ${label}`;
    }
  });

  if (!formValues.image) {
    errors.image = "Please select a photo";
  }

  return errors;
};

const MyForm = reduxForm({
  form: "addPhotoForm",
  validate,
  multipartForm: true
})(AddAPhoto);

export default connect(null, { addPhoto })(MyForm);
