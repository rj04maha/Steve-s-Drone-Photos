import React from "react";
import { Link } from "react-router-dom";

const OrderCard = props => {
  function renderCard() {
    return props.arr.reverse().map(order => {
      return (
        <div
          className={`ui ${
            order.fullfilled ? "green" : order.paid ? "yellow" : "red"
          } card`}
          key={order._id}
        >
          <div className="content">
            <div className="header">
              {order.firstName} {order.lastName}
            </div>
          </div>
          <div className="content">
            <h4 className="ui sub header">Order number: {order._id}</h4>
            <div className="ui small feed">
              <div className="event">
                <div className="content">
                  <div className="summary">
                    <div>Paid: {order.paid ? "Yes" : "No"}</div>
                  </div>
                </div>
              </div>
              <div className="event">
                <div className="content">
                  <div className="summary">
                    <div>Fullfilled: {order.fullfilled ? "Yes" : "No"}</div>
                  </div>
                </div>
              </div>
              <div className="event">
                <div className="content">
                  <div className="summary">
                    <div>Email: {order.email}</div>
                  </div>
                </div>
              </div>
              <div className="event">
                <div className="content">
                  <div className="summary">
                    <div>Phone Number: {order.phone}</div>
                  </div>
                </div>
              </div>
              <div className="event">
                <div className="content">
                  <div className="summary">
                    <div>
                      Order placed:
                      {new Date(order.datePlaced).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="event">
                <div className="content">
                  <div className="summary">
                    <div>Notes (optional): {order.note}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="extra content">
            <Link to={`/orders/edit/${order._id}`}>
              <button className="ui button">View Order</button>
            </Link>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="ui segment">
        <h1>{props.title}</h1>
        <div className="ui doubling cards">{renderCard()}</div>
      </div>
    </div>
  );
};

export default OrderCard;
