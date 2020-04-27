import React from "react";
import { Field, reduxForm } from "redux-form";
import renderInput from "./RenderInput";
import Sidebar from "./Sidebar";
import RenderStateInput from "./RenderStateInput";
import RenderPayment from "./RenderPayment";

class CustomerInfoForm extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { handleSubmit, previousPage } = this.props;

    const buttons = (
      <>
        <button type="submit" className="ui button olive fluid">
          Confirm order
          <i className="right arrow icon"></i>
        </button>
        <br />
        <button
          type="button"
          className="ui fluid button"
          onClick={previousPage}
        >
          <i className="left arrow icon"></i>
          Back
        </button>
      </>
    );

    function getShipping(isShipping) {
      if (isShipping) {
        return (
          <>
            <h1 className="ui dividing header">Shipping Address</h1>
            <div className="field">
              <Field name="addr1" component={renderInput} label="Address" />
            </div>
            <div className="field">
              <Field
                name="addr2"
                component={renderInput}
                label="Address line 2 (optional)"
              />
            </div>

            <div className="two fields">
              <div className="field">
                <label>State</label>
                <Field name="state" component={RenderStateInput} />
              </div>
              <div className="field">
                <Field
                  name="zip"
                  component={renderInput}
                  label="Zipcode"
                  max="5"
                />
              </div>
            </div>
          </>
        );
      }
    }
    const { isShipping } = this.props;
    return (
      <div className="ui container">
        <form onSubmit={handleSubmit} className="ui form error">
          <div className="ui grid stackable">
            <div className="ten wide column">
              <h1 className="ui dividing header">Delivery Information</h1>
              <div className="field">
                <div className="two fields">
                  <Field
                    name="firstName"
                    component={renderInput}
                    label="First Name"
                  />
                  <div className="field">
                    <Field
                      name="lastName"
                      component={renderInput}
                      label="Last Name"
                    />
                  </div>
                </div>

                <div className="field">
                  <Field name="email" component={renderInput} label="Email" />
                </div>
              </div>
              {getShipping(isShipping)}
              <h1 className="ui dividing header">Payment Options</h1>
              <p>
                Payment instructions will be provided in the comfirmation email.
              </p>
              <Field name="payment" component={RenderPayment} />

              <label>Optional message or note</label>
              <div>
                <Field
                  name="customerNote"
                  component="textarea"
                  placeholder="Note"
                />
              </div>
            </div>
            <div className="six wide column">
              <Sidebar
                buttons={buttons}
                totes={this.props.totals}
                handlingCost={this.props.isShipping ? 15 : 0}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.firstName) {
    errors.firstName = "Please enter first name";
  }

  if (!formValues.lastName) {
    errors.lastName = "Please enter last name";
  }
  if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email) ||
    !formValues.email
  ) {
    errors.email = "Invalid email address";
  }

  if (!formValues.addr1) {
    errors.addr1 = "Please enter your address";
  }
  if (!formValues.state) {
    errors.state = "Please enter your state";
  }
  if (!/^[0-9]{5}(?:-[0-9]{4})?$/.test(formValues.zip) || !formValues.zip) {
    errors.zip = "Invalid valid zipcode";
  }

  if (!formValues.payment) {
    errors.payment = "Please select a payment option";
  }

  return errors;
};

export default reduxForm({
  form: "orderForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(CustomerInfoForm);
