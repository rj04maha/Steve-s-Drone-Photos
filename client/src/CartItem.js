import React from "react";
import { connect } from "react-redux";
import { removeFromCart } from "../actions";

const CartItem = props => {
  return (
    <tr>
      <td data-label="Photo">
        <img
          className="ui tiny centered image"
          alt={props.photo.description}
          src={props.photo.urls.regular}
        />
        <button
          className="ui button fluid"
          style={{ marginTop: "1vw" }}
          onClick={() => props.removeFromCart(props.photo.id)}
        >
          Delete<i className="right close icon"></i>
        </button>
      </td>
      <td data-label="Description">{props.photo.description}</td>
      <td data-label="Digital Copy">
        Quantity:
        <input type="number" name="digital_quantity" min="0" max="100" />
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
    </tr>
  );
};

const mapStateToProps = state => {
  return { cart: state.cart };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: photoId => {
      dispatch(removeFromCart(photoId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
