import React from "react";
import { Field, reduxForm } from "redux-form";
const payments = ["Cash", "Check", "Venmo"];

const renderPayment = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">Select a payment option...</option>
      {payments.map(val => (
        <option value={val} key={val}>
          {val}
        </option>
      ))}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

const Billing = props => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  return (
    <div className="ui container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Payment options</label>
          <Field name="favoriteColor" component={renderPayment} />
        </div>
        <label>Notes</label>
        <div>
          <Field name="notes" component="textarea" placeholder="Notes" />
        </div>

        <div>
          <button
            type="button"
            className="ui left floated button"
            onClick={previousPage}
          >
            <i className="left arrow icon"></i>
            Previous
          </button>
          <button
            type="submit"
            className="ui right floated button"
            disabled={pristine || submitting}
          >
            Submit
            <i className="right arrow icon"></i>
          </button>
        </div>
      </form>
    </div>
  );
};
export default reduxForm({
  form: "orderForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(Billing);
