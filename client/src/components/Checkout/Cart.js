import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import CartItem from "./CartItem";
import { removeFromCart } from "../../actions";
//import _ from "lodash";
//import { Field, reduxForm, FieldArray } from "redux-form";
//import renderPhotoInput from "./RenderPhotoInput";

/* const FIELDS = [
  { label: "Digital Copy", name: "digitalCopy", cost: 5 },
  { label: "4 x 6", name: "copy4x6", cost: 10 },
  { label: "6 x 11", name: "copy6x11", cost: 15 },
  { label: "20 x 30", name: "copy20x30", cost: 20 }
]; */

class Cart extends React.Component {
  render() {
    if (this.props.cart.length > 0) {
      return <div>cart</div>;
    } else {
      return (
        <div>
          <div className="ui container space">
            <h2 className="ui huge header">Your cart</h2>
            <p>Your cart is empty please select photos to order</p>
            <Link to="/photos">
              <button className="ui button">
                Check them out here<i className="right chevron icon"></i>
              </button>
            </Link>
          </div>
        </div>
      );
    }
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
/* renderFields = ({ id }) => {
    return _.map(FIELDS, ({ label, name, cost }) => {
      if (name === "digitalCopy") {
        return (
          <tr key={name}>
            <td>{label}</td>
            <td>
              <Field
                name={`${name}-${id}`}
                id={`${name}-${id}`}
                component="input"
                type="checkbox"
              />
            </td>
            <td>${cost}.00</td>
          </tr>
        );
      }

      return (
        <tr key={name}>
          <td>{label}</td>
          <td>
            <Field
              key={name}
              name={`${name}-${id}`}
              component={renderPhotoInput}
              label={label}
            />
          </td>
          <td>${cost}.00</td>
        </tr>
      );
    });
  };

  calculateTotal() {
    let total = 0;
    return total; //fix me later
  }

  render() {
    const { handleSubmit } = this.props;
    if (this.props.cart.length > 0) {
      return (
        <div className="ui container space">
          <h1 className="ui left floated header">Your cart</h1>
          <button
            className="ui left floated button"
            onClick={() => console.log(this.orderForm)}
          >
            Click for values
          </button>
          <div>
            <h1 className="ui right floated header">
              Total: ${this.calculateTotal()}
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <table className="ui unstackable celled table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Description</th>
                  <th>Photo Options</th>
                </tr>
              </thead>
              <tbody>
                {this.props.cart.map(image => (
                  <tr key={image.photo.id}>
                    <td data-label="Photo">
                      <img
                        className="ui tiny centered image"
                        alt={image.photo.description}
                        src={image.photo.urls.regular}
                      />

                      <button
                        className="ui red button fluid"
                        style={{ marginTop: "1vw" }}
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to remove this item?"
                            )
                          ) {
                            this.props.removeFromCart(image.photo.id);
                          }
                        }}
                      >
                        REMOVE FROM CART
                        <i className="right close inverted icon"></i>
                      </button>
                    </td>
                    <td data-label="Description">{image.photo.description}</td>
                    <td>
                      <table className="ui very basic striped table">
                        <tbody>{this.renderFields(image.photo)}</tbody>
                      </table>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <button type="submit" className="ui button right floated">
                Next
                <i className="right arrow icon"></i>
              </button>
            </div>
          </form>
          <Link to="/photos">
            <button className="ui left floated button">
              <i className="left arrow icon"></i>
              Add more photos to cart
            </button>
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <div className="ui container space">
            <h2 className="ui huge header">Your cart</h2>
            <p>Your cart is empty please select photos to order</p>
            <Link to="/photos">
              <button className="ui button">
                Check them out here<i className="right chevron icon"></i>
              </button>
            </Link>
          </div>
        </div>
      );
    }
  }
}
const validate = formValues => {
  const errors = {};

  if (_.isEmpty(formValues)) {
    errors.copy20x30 = "You must enter your at least one copy";
  }

  return errors;
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

const formWrap = reduxForm({
  form: "orderForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(Cart);

export default connect(mapStateToProps, mapDispatchToProps)(formWrap);
 */
