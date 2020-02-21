import React from "react";
import { Field, reduxForm } from "redux-form";

class UserForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <div style={{ color: "red" }}>{error}</div>;
    }
  }
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit(formValues) {
    console.log(formValues);
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="firstName"
          component={this.renderInput}
          label="First Name: "
        />
        <Field
          name="lastName"
          component={this.renderInput}
          label="Last Name: "
        />
        <button className="ui button">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.firstName) {
    errors.firstName = "You must enter your first name";
  }
  if (!formValues.lastName) {
    errors.lastName = "You must enter your last name";
  }
  return errors;
};

export default reduxForm({
  form: "getUserInfo",
  validate
})(UserForm);
