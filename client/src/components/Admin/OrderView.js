import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrder } from "../../actions";
import { fetchPhotos } from "../../actions";
import SmallPhotoCards from "../Checkout/SmallPhotoCards";

const FIELDS = [
  { label: "First Name", name: "firstName" },
  { label: "Last Name", name: "lastName" },
  { label: "Email", name: "email" },
  { label: "Address (line 1)", name: "addr1" },
  { label: "Address (line 2)", name: "addr2" },
  { label: "Zipcode", name: "zip" },
  { label: "State", name: "state" },
  { label: "Payment Type", name: "payment" },
  { label: "Note/Message (optional)", name: "customerNote" },
];

const OrderView = (props) => {
  const order = useSelector((state) => state.orders[props.match.params.id]);
  const pic = useSelector((state) => state.photos);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchOrder(props.match.params.id));
      dispatch(fetchPhotos());
    };
    setLoading(false);
    fetchData();
  }, [dispatch, props.match.params.id]);

  function getPhotos(photos) {
    if (Object.keys(pic).length > 0) {
      return Object.keys(photos).map((key) => {
        const value = photos[key];
        const photo = pic[key];
        return (
          <SmallPhotoCards
            key={photo.name}
            name={photo.name}
            source={photo.source}
            digital={value.digital}
            copy11x14={value.copy11x14}
            copy13x19={value.copy13x19}
          />
        );
      });
    } else {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading</div>
        </div>
      );
    }
  }

  if (order) {
    const { datePlaced, _id, photos, total } = order;
    const date = new Date(datePlaced);
    return (
      <div className="ui container" style={{ paddingTop: "1em" }}>
        <Link to="/admin" className="ui button right floated">
          <i className="left arrow icon"></i>
          Back to dashboard
        </Link>
        <h1>View Order</h1>
        <table className="ui celled table">
          <thead>
            <tr>
              <th colSpan="2">Order # {_id}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Date placed</td>
              <td>{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</td>
            </tr>
            {FIELDS.map((field) => {
              return (
                <tr key={field.label}>
                  <td>{field.label}</td>
                  <td>{order[field.name]}</td>
                </tr>
              );
            })}
            <tr>
              <td>Photos</td>
              <td>
                <div className="ui stackable cards">{getPhotos(photos)}</div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <th>
                <strong>${total}.00</strong>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading</div>
      </div>
    );
  } else {
    return (
      <div className="ui container">
        The order with ID #{props.match.params.id} cannot be found
        <Link to="/admin" className="ui right floated button">
          <i className="left arrow icon"></i>
          Back to dashboard
        </Link>
      </div>
    );
  }
};

export default OrderView;
