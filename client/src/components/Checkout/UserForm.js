import React from "react";
//import { Link } from "react-router-dom";
import _ from "lodash";
//import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import renderInput from "./RenderInput";

const FIELDS = [
  { label: "First Name", name: "firstName" },
  { label: "Last Name", name: "lastName" },
  { label: "Email", name: "email" },
  { label: "Phone Number", name: "phone" }
];

class UserForm extends React.Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field key={name} name={name} component={renderInput} label={label} />
      );
    });
  }

  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <div className="ui container">
        <form
          onSubmit={handleSubmit}
          //onSubmit={() => submitOrder(formValues, history)}
          className="ui form error"
        >
          {this.renderFields()}

          <label>Optional message or note</label>
          <div>
            <Field
              name="customerNote"
              component="textarea"
              placeholder="Note"
            />
          </div>

          <div style={{ paddingTop: "20px" }}></div>
          <div>
            <button
              type="button"
              className="ui button left foated"
              onClick={previousPage}
            >
              <i className="left arrow icon"></i>
              Previous
            </button>
            <button type="submit" className="ui button right floated">
              Next
              <i className="right arrow icon"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};

  _.each(FIELDS, ({ name, label }) => {
    if (!formValues[name] || formValues[name].trim().length < 1) {
      errors[name] = `You must enter your ${label}`;
    }
  });

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
    errors.email = "Invalid email address";
  }

  if (
    !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formValues.phone)
  ) {
    errors.phone = "Invalid phone number";
  }

  return errors;
};

export default reduxForm({
  form: "orderForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(UserForm);

/* import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import renderInput from "./RenderInput";
import { submitOrder } from "../../actions";

const FIELDS = [
  { label: "First Name", name: "firstName" },
  { label: "Last Name", name: "lastName" },
  { label: "Email", name: "email" },
  { label: "Phone Number", name: "phone" }
];

class UserForm extends React.Component {
  onSubmit = formValues => {
    //console.log(formValues);
    this.props.submitOrder(formValues);
  };

  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field key={name} name={name} component={renderInput} label={label} />
      );
    });
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        //onSubmit={() => submitOrder(formValues, history)}
        className="ui form error"
      >
        {this.renderFields()}

        <label>Optional message or note</label>
        <div>
          <Field name="customerNote" component="textarea" placeholder="Note" />
        </div>

        <div style={{ paddingTop: "20px" }}>
          <Link to="/cart">
            <button className="ui button left foated">
              <i className="left arrow icon"></i>Back to cart
            </button>
          </Link>

          <button className="ui button right floated">
            Continue
            <i className="right arrow icon"></i>
          </button>
        </div>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  _.each(FIELDS, ({ name, label }) => {
    if (!formValues[name] || formValues[name].trim().length < 1) {
      errors[name] = `You must enter your ${label}`;
    }
  });

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
    errors.email = "Invalid email address";
  }

  if (
    !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formValues.phone)
  ) {
    errors.phone = "Invalid phone number";
  }

  return errors;
};
//function mapStateToProps({ orders }) {
//return { orders };
//}

const formWrap = reduxForm({
  form: "getUserInfo",
  validate
})(UserForm);

export default connect(null, { submitOrder })(formWrap);
 */
