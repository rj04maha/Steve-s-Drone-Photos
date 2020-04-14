/* import React from "react";
import { connect } from "react-redux";
import { removeFromCart } from "../../actions";
import _ from "lodash";
import { Field, reduxForm } from "redux-form";
import renderPhotoInput from "./RenderPhotoInput";

const FIELDS = [
  { label: "Digital Copy", name: "digitalCopy", cost: 5 },
  { label: "4 x 6", name: "copy4x6", cost: 10 },
  { label: "6 x 11", name: "copy6x11", cost: 15 },
  { label: "20 x 30", name: "copy20x30", cost: 20 },
];

const CartItem = (props) => {
  function renderFields() {
    return _.map(FIELDS, ({ label, name, cost }) => {
      return (
        <tr key={name}>
          <td>{label}</td>
          <td>
            <Field
              key={name}
              name={`${name}-${props.photo.id}`}
              component={renderPhotoInput}
              label={label}
            />
          </td>
          <td>${cost}.00</td>
        </tr>
      );
    });
  }
  const { id, description, urls } = props.photo;
  return (
    <tr key={id}>
      <td data-label="Photo">
        <img
          className="ui tiny centered image"
          alt={description}
          src={urls.regular}
        />
        <button
          className="ui red button fluid"
          style={{ marginTop: "1vw" }}
          onClick={() => {
            if (window.confirm("Are you sure you want to remove this item?")) {
              props.removeFromCart(photo.id);
            }
          }}
        >
          Remove from<i className="right close inverted icon"></i>
        </button>
      </td>
      <td data-label="Description">{description}</td>
      <td>
        <table className="ui very basic striped table">
          <tbody>{renderFields()}</tbody>
        </table>
      </td>
    </tr>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (_.isEmpty(formValues)) {
    errors.copy20x30 = "You must enter your at least one copy";
  }

  return errors;
};

const mapStateToProps = (state) => {
  return { cart: state.cart };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (photoId) => {
      dispatch(removeFromCart(photoId));
    },
  };
};

const formWrap = reduxForm({
  form: "getPhotoPrices",
  validate,
})(CartItem);

export default connect(mapStateToProps, mapDispatchToProps)(formWrap);

/* <td data-label="Digital Copy">
        <div className="ui checkbox">
          <input type="checkbox" name="digital" />
          <label>$5.00</label>
        </div>
      </td>
      <td data-label="Printed Copy">
        <table className="ui very basic striped table">
          <tbody>
            <tr>
              <td>
                <div className="ui checkbox">
                  <input type="checkbox" name="example" />
                  <label>4 x 6 </label>
                </div>
              </td>
              <td>
                Quantity:{" "}
                <input
                  type="number"
                  name="printed_quantity"
                  min="0"
                  max="100"
                />
              </td>
              <td>$5.00</td>
            </tr>
            <tr>
              <td>
                <div className="ui checkbox">
                  <input type="checkbox" name="example" />
                  <label>6 x 11 </label>
                </div>
              </td>
              <td>
                Quantity:{" "}
                <input
                  type="number"
                  name="printed_quantity"
                  min="0"
                  max="100"
                />
              </td>
              <td>$10.00</td>
            </tr>
            <tr>
              <td>
                <div className="ui checkbox">
                  <input type="checkbox" name="example" />
                  <label>20 x 30 </label>
                </div>
              </td>
              <td>
                Quantity:{" "}
                <input
                  type="number"
                  name="printed_quantity"
                  min="0"
                  max="100"
                />
              </td>
              <td>$20.00</td>
            </tr>
          </tbody>
        </table>
      </td> 
      
      
      
      
      
      renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field key={name} name={name} component={renderInput} label={label} />
      );
    });
  }
  
  
  */
 */