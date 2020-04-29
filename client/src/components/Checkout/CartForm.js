import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Field,
  reduxForm,
  unregisterField,
  formValueSelector,
  change,
} from "redux-form";
import { useDispatch, connect } from "react-redux";
import _ from "lodash";
import Sidebar from "./Sidebar";
import CalculateTotal from "./CalculateTotal";

let CartForm = (props) => {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { getValues } = props;
  var totals = CalculateTotal(getValues);
  if (totals) {
    props.setMasterStates(totals.shipping, totals.totalCost);
  }

  const dispatch = useDispatch();

  function removeItem(id) {
    setIsEnabled(false);
    dispatch(props.removeFromCart(id));
    setIsEnabled(true);
  }

  const renderError = ({ meta: { touched, error } }) => {
    if (error && touched) {
      return (
        <div className="ui red message">
          <i className="warning icon"></i>
          {error}
        </div>
      );
    } else {
      return null;
    }
  };

  function onSubmit() {
    setIsEnabled(false);
    props.checkoutButton();
  }

  if (!isEnabled) {
    return (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading</div>
      </div>
    );
  }

  const buttons = (
    <>
      <button disabled={!isEnabled} className="ui button olive fluid">
        {props.button}
      </button>
      <br />
      <Link to="/photos">
        <button className="ui button fluid">
          Add more photos to cart <i className="plus icon" />
        </button>
      </Link>
    </>
  );

  const cart = props.photos;
  return (
    <form className="ui form" onSubmit={props.handleSubmit(onSubmit)}>
      <div className="ui grid stackable">
        <div className="ten wide column">
          <table className="ui very basic table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Price</th>
                <th>Delivery</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="ui label">Digital</div>
                </td>
                <td>
                  <strong>$10.00</strong>
                </td>
                <td>
                  You will recieve a high quality image via email within 5-10
                  business days
                </td>
              </tr>
              <tr>
                <td>
                  <div className="ui label">13" x 19"</div>
                </td>
                <td>
                  <strong>$15.00</strong>
                </td>
                <td>
                  Printed on glossy paper and will be mailed to the address
                  provided
                </td>
              </tr>
              <tr>
                <td>
                  <div className="ui label">11" x 14"</div>
                </td>
                <td>
                  <strong>$20.00</strong>
                </td>
                <td>
                  Printed on glossy paper and will be mailed to the address
                  provided
                </td>
              </tr>
            </tbody>
          </table>

          <div className="ui divider"></div>
          <div className="ui relaxed divided list">
            {cart.map((image) => (
              <div className="item" key={image._id} style={{ padding: "1em" }}>
                <div className="right floated content">
                  {totals
                    ? totals[image._id]
                      ? `$${totals[image._id]}.00`
                      : "$0.00"
                    : "$0.00"}
                  <i
                    onClick={() => removeItem(image._id)}
                    className="trash alternate link icon"
                  />
                </div>

                <img
                  className="ui tiny image"
                  alt={image.name}
                  src={image.source}
                />

                <div className="content">
                  <div className="header">{image.name}</div>
                  <div className="description">{image.location}</div>
                </div>
                <Field name={image._id} component={renderError} />
                <div>
                  <div className="three fields">
                    <div className="inline field">
                      <label>Digital Copy</label>
                      <Field
                        name={`photos.${image._id}.digital`}
                        type="text"
                        component="select"
                        label="Digital"
                      >
                        <option />
                        <option value="yes">1 - $10 </option>
                      </Field>
                    </div>
                    <div className="inline field">
                      <label>13" x 19"</label>
                      <Field
                        name={`photos.${image._id}.copy13x19`}
                        label='13" x 19"'
                        component="select"
                      >
                        <option />
                        <option value="1">1 - $15 each</option>
                        <option value="2">2 - $30</option>
                        <option value="3">3 - $45</option>
                        <option value="4">4 - $60</option>
                        <option value="5">5 - $75</option>
                        <option value="6">6 - $90</option>
                        <option value="7">7 - $105</option>
                        <option value="8">8 - $120</option>
                        <option value="9">9 - $135</option>
                        <option value="10">10 - $150</option>
                      </Field>
                    </div>
                    <div className="inline field">
                      <label>11" x 14"</label>
                      <Field
                        name={`photos.${image._id}.copy11x14`}
                        label='11" x 14"'
                        component="select"
                      >
                        <option />
                        <option value="1">1 - $20 each</option>
                        <option value="2">2 - $40</option>
                        <option value="3">3 - $60</option>
                        <option value="4">4 - $80</option>
                        <option value="5">5 - $100</option>
                        <option value="6">6 - $120</option>
                        <option value="7">7 - $140</option>
                        <option value="8">8 - $160</option>
                        <option value="9">9 - $180</option>
                        <option value="10">10 - $200</option>
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="six wide column">
          <Sidebar
            buttons={buttons}
            totes={totals ? totals.totalCost : 0}
            handlingCost={totals ? (totals.shipping ? 15 : 0) : 0}
          />
        </div>
      </div>
    </form>
  );
};

const validate = (formValues, props) => {
  const errors = {};

  _.mapKeys(props.photos, (photo) => {
    if (
      formValues.photos === undefined ||
      !formValues.photos.hasOwnProperty(photo._id)
    ) {
      errors[photo._id] =
        "You must choose quantity or remove it from your cart.";
    }
  });

  return errors;
};

CartForm = reduxForm({
  form: "orderForm",
  validate,
  destroyOnUnmount: false,
})(CartForm);

const selector = formValueSelector("orderForm");

CartForm = connect((state) => {
  const getValues = selector(state, "photos");
  return {
    getValues,
  };
})(CartForm);

export default CartForm;
