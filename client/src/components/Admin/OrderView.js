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
      <div className="ui container">
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
        <Link to="/admin" className="ui button">
          <i className="left arrow icon"></i>
          Back to dashboard
        </Link>
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

/* 

<tr>
              <td className="collapsing">Last Name</td>
              <td>{lastName}</td>
            </tr>
            <tr>
              <td className="collapsing">Email</td>
              <td>{email}</td>
            </tr>
            <tr>
              <td className="collapsing">Order placed</td>
              <td>
                {`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
              </td>
            </tr>
            <tr>
              <td className="collapsing">Photos</td>
              <td>{photos}</td>
            </tr>
            <tr>
              <td className="collapsing">Notes from customer</td>
              <td>{customerNote}</td>
            </tr>
            <tr>
              <td className="collapsing">Notes from you</td>
              <td>{adminNote}</td>
            </tr>
            <tr>
              <td className="collapsing">Fullfilled</td>
              <td>{fullfilled ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td className="collapsing">Paid</td>
              <td>{paid ? "Yes" : "No"}</td>
            </tr>


import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrder } from "../../actions";

class OrderView extends React.Component {
  componentDidMount() {
    this.props.fetchOrder(this.props.match.params.id);
  }
  render() {
    if (this.props.order) {
      //console.log(this.props.order.firstName);
      const {
        firstName,
        lastName,
        email,
        datePlaced,
        fullfilled,
        photos,
        customerNote,
        adminNote,
        paid,
        _id,
      } = this.props.order;

      const updatedFields = null; //fix me
      const date = new Date(datePlaced);
      return (
        <div className="ui container">
          <h1>View Order</h1>

          <table className="ui celled table">
            <thead>
              <tr>
                <th colSpan="2">Order # {_id}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="collapsing">First Name</td>
                <td>{firstName}</td>
              </tr>
              <tr>
                <td className="collapsing">Last Name</td>
                <td>{lastName}</td>
              </tr>
              <tr>
                <td className="collapsing">Email</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td className="collapsing">Order placed</td>
                <td>
                  {`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
                </td>
              </tr>
              <tr>
                <td className="collapsing">Photos</td>
                <td>{photos}</td>
              </tr>
              <tr>
                <td className="collapsing">Notes from customer</td>
                <td>{customerNote}</td>
              </tr>
              <tr>
                <td className="collapsing">Notes from you</td>
                <td>{adminNote}</td>
              </tr>
              <tr>
                <td className="collapsing">Fullfilled</td>
                <td>{fullfilled ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="collapsing">Paid</td>
                <td>{paid ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>
          <Link to="/admin" className="ui button">
            <i className="left arrow icon"></i>
            Back to dashboard
          </Link>
          <button
            onClick={() => this.props.updateOrder(_id, updatedFields)}
            className="ui olive right floated button"
          >
            Update
          </button>
        </div>
      );
    } else {
      return (
        <div className="ui container">
          The order with #{this.props.match.params.id} cannot be found
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return { order: state.orders[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchOrder })(OrderView);
 */
