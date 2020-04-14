import React from "react";
import { Link } from "react-router-dom";

const OrderTable = props => {
  function renderCard() {
    return props.arr.reverse().map(order => {
      return (
        <tr key={order._id}>
          <td data-label="Name">
            {order.firstName} {order.lastName}
          </td>
          <td data-label="Paid">{order.paid ? "Yes" : "No"}</td>
          <td data-label="Fullfilled">{order.fullfilled ? "Yes" : "No"}</td>
          <td data-label="Date">
            {new Date(order.datePlaced).toLocaleDateString()}
          </td>
          <td data-label="Fullfilled">$20.00</td>
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
            <th>Paid</th>
            <th>Fullfilled</th>
            <th>Date Placed</th>
            <th>Total</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>{renderCard()}</tbody>
      </table>
    );
  }

  return (
    <div>
      <div className="ui segment">
        <h3>{props.title}</h3>
        {props.alert}

        {props.arr.length > 0 ? renderTableHeader() : "No orders to show"}
      </div>
    </div>
  );
};

export default OrderTable;
