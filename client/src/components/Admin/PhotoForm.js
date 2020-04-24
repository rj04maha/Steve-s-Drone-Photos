import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import _ from "lodash";
import RenderInput from "../Checkout/RenderInput";
import DatePickerComponent from "./DatePickerComponent";

const FIELDS = [
  { label: "Name", name: "name" },
  { label: "Tags (seperate with commas)", name: "tags" },
  { label: "Location", name: "location" },
];

const PhotoForm = (props) => {
  const [isEnabled, setIsEnabled] = useState(true);

  function renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field key={name} name={name} component={RenderInput} label={label} />
      );
    });
  }

  function onSubmit(formValues) {
    setIsEnabled(false);
    props.onSubmit(formValues);
    setIsEnabled(props.buttonEnable);
  }

  if (!isEnabled) {
    return (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Uploading</div>
      </div>
    );
  }

  return (
    <form
      className="ui form"
      onSubmit={props.handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      {props.img}
      {renderFields()}
      <Field
        name="dateTaken"
        component={DatePickerComponent}
        label="Date taken (initalized by last modified date)"
      />

      <button disabled={!isEnabled} className="ui green button">
        {props.button}
      </button>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};

  _.each(FIELDS, ({ name, label }) => {
    if (!formValues[name] || formValues[name].length < 1) {
      errors[name] = `You must enter ${label}`;
    }
  });

  if (!formValues.image) {
    errors.image = "Please select a photo";
  }

  if (!formValues.dateTaken) {
    errors.dateTaken = "Please select date which photo was taken";
  }
  return errors;
};

export default reduxForm({
  form: "photoForm",
  validate,
  multipartForm: true,
  enableReinitialize: true,
})(PhotoForm);
