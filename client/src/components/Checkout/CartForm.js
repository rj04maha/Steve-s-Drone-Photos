import React, { useState } from "react";
import { Field, reduxForm, FieldArray, formValueSelector } from "redux-form";
import { useDispatch, connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import { removeFromCart } from "../../actions";
import CalculateTotal from "./CalculateTotal";

let CartForm = (props) => {
  const { getValues } = props;

  let totals = CalculateTotal(getValues);

  const [isEnabled, setIsEnabled] = useState(true);

  const dispatch = useDispatch();

  function onlyOnce(fields) {
    if (fields.length < 1) {
      fields.push({});
    }
  }

  const renderImage = ({ fields }) => (
    <>
      <>{onlyOnce(fields)}</>
      {fields.map((photo, index) => (
        <div key={index}>
          <div className="three fields">
            <div className="inline field">
              <label>Digital Copy</label>
              <Field
                name={`${photo}.digital`}
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
                name={`${photo}.copy13x19`}
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
                name={`${photo}.copy11x14`}
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
      ))}
    </>
  );

  const renderError = ({ meta: { touched, error } }) => {
    if (error && touched) {
      return (
        <div className="ui inverted red segment">
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

  function getCost(x) {
    if (totals) {
      return `$${totals[x]}.00`;
    }
  }

  function getSummary() {
    if (totals) {
      return (
        <>
          <div style={{ float: "right" }}>${totals.totalCost}.00</div>
          <div>Subtotal </div>
          <div style={{ float: "right" }}>$15.00</div>
          <div> Shipping & Handling </div>
          <div className="ui divider"></div>
          <h3 style={{ float: "right" }}>${totals.totalCost + 15}.00</h3>
          <h3>Total </h3>
          <div className="ui divider"></div>
        </>
      );
    }
  }
  const cart = props.photos;
  return (
    <form className="ui form" onSubmit={props.handleSubmit(onSubmit)}>
      <div className="ui grid stackable">
        <div className="ten wide column">
          <table className="ui very basic celled table">
            <tbody>
              <tr>
                <th>Prices</th>
                <th>
                  <div className="ui divided list">
                    <div className="item">
                      <div className="ui horizontal label">Digital</div>
                      $10.00
                    </div>
                    <div className="item">
                      <div className="ui horizontal label">13" x 19"</div>
                      $15.00
                    </div>
                    <div className="item">
                      <div className="ui horizontal label">11" x 14"</div>
                      $20.00
                    </div>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>

          <p>
            Please select the quantity of the photo(s) you would like to order.
            11" x 14" and 13" x 19" are printed on glossy paper and will be
            mailed to the address provided. If you opt for a digital copy of the
            photo, you will recieve a high quality image via email within 5-10
            business days.
          </p>
          <div className="ui divider"></div>

          <div className="ui relaxed divided list">
            {cart.map((image, index) => (
              <div className="item" key={image._id} style={{ padding: "1em" }}>
                <div className="right floated content">
                  <i
                    onClick={() => dispatch(removeFromCart(image._id))}
                    className="close link icon"
                  />
                  {getCost(_.findIndex(cart, image))}
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
                <div>
                  <FieldArray
                    name={`id.${image._id}`}
                    component={renderImage}
                  />
                  <Field name={index.toString()} component={renderError} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="six wide column">
          <div
            className="ui segment"
            style={{
              position: "-webkit-sticky",
              position: "sticky",
              top: "8em",
            }}
          >
            <h2>Summary</h2>
            {getSummary()}
            <button disabled={!isEnabled} className="ui button olive fluid">
              {props.button}
            </button>
            <br />
            <Link to="/photos">
              <button className="ui button fluid">
                <i className="left arrow icon"></i>
                Add more photos to cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (formValues.id) {
    Object.values(formValues.id).map((copy, copyIndex) => {
      if (_.isEmpty(copy[0])) {
        errors[copyIndex] =
          "You must select at least one item or remove it from your cart.";
      }
      return null;
    });
  }
  return errors;
};

CartForm = reduxForm({
  form: "orderForm",
  validate,
  destroyOnUnmount: false,
})(CartForm);

const selector = formValueSelector("orderForm");

CartForm = connect((state) => {
  // can select values individually
  const getValues = selector(state, "id");
  return {
    getValues,
  };
})(CartForm);

export default CartForm;
