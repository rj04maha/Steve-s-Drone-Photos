import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import SmallPhotoCards from "./SmallPhotoCards";

const FIELDS = [
  { label: "First Name", name: "firstName" },
  { label: "Last Name", name: "lastName" },
  { label: "Email", name: "email" },
  { label: "Phone Number", name: "phone" },
  { label: "Payment Type", name: "payment" },
  { label: "Note", name: "customerNote" },
];

const ADDR_FIELDS = [
  { label: "Address (line 1)", name: "addr1" },
  { label: "Address (line 2)", name: "addr2" },
  { label: "City", name: "city" },
  { label: "State", name: "state" },
  { label: "Zipcode", name: "zip" },
];

var ConfirmOrder = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  const formVals = useSelector((state) => state.form.orderForm.values);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function showAddress() {
    if (props.isShipping) {
      return ADDR_FIELDS.map((field) => {
        return (
          <tr key={field.label}>
            <td>{field.label}</td>
            <td>{formVals[field.name]}</td>
          </tr>
        );
      });
    }
  }

  function getPhotos() {
    return Object.values(cart).map((photo) => {
      const pic = formVals.photos[photo._id];
      return (
        <SmallPhotoCards
          name={photo.name}
          source={photo.source}
          digital={pic.digital}
          copy11x14={pic.copy11x14}
          copy13x19={pic.copy13x19}
          key={photo._id}
        />
      );
    });
  }

  return (
    <div className="ui container">
      <h1>Please review your order</h1>
      <table className="ui celled table">
        <tbody>
          {FIELDS.map((field) => {
            return (
              <tr key={field.label}>
                <td>{field.label}</td>
                <td>{formVals[field.name]}</td>
              </tr>
            );
          })}
          {showAddress()}
          <tr>
            <td>Photos</td>
            <td>
              <div className="ui stackable cards">{getPhotos()}</div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            <th>
              <strong>${props.totals}.00</strong>
            </th>
          </tr>
        </tfoot>
      </table>

      <form onSubmit={handleSubmit}>
        <div className="ui grid stackable">
          <div className="eight wide column">
            <button
              type="button"
              className="ui fluid  button"
              onClick={previousPage}
            >
              <i className="left arrow icon"></i>
              Go back
            </button>
          </div>
          <div className="eight wide column">
            <button
              type="submit"
              className="ui fluid olive button"
              disabled={pristine || submitting}
            >
              PLACE ORDER
              <i className="right arrow icon"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
ConfirmOrder = reduxForm({
  form: "orderForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ConfirmOrder);

export default ConfirmOrder;
