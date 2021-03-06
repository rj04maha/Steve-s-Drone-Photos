import React from "react";
import { Link } from "react-router-dom";

const OrderTable = (props) => {
  function renderCard() {
    return props.arr.reverse().map((order) => {
      return (
        <tr key={order._id}>
          <td data-label="Name">
            {order.firstName} {order.lastName}
          </td>
          <td data-label="Date">
            {new Date(order.datePlaced).toLocaleDateString()}
          </td>
          <td data-label="Id">{order._id.substr(order._id.length - 5)}</td>
          <td data-label="Payment">{order.payment}</td>
          <td data-label="Total">${order.total}.00</td>
          <td data-label="View">
            <Link to={`/orders/view/${order._id}`}>
              <button className="ui button">View Order</button>
            </Link>
          </td>
        </tr>
      );
    });
  }

  function renderTableHeader() {
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date Placed</th>
            <th>Order ID</th>
            <th>Payment Type</th>
            <th>Total</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>{renderCard()}</tbody>
      </table>
    );
  }

  if (!props.isLoading && props.arr.length > 0) {
    return (
      <div className="ui segment">
        <h3>{props.title}</h3>
        {renderTableHeader()}
      </div>
    );
  } else if (props.loading && props.arr.length === 0) {
    return (
      <div className="ui segment">
        <h3>{props.title}</h3>
        No orders to show
      </div>
    );
  } else {
    return (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading</div>
      </div>
    );
  }
};

export default OrderTable;
