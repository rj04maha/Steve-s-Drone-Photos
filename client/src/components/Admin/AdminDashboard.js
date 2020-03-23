import React from "react";
import { Link } from "react-router-dom";
import OrderList from "./OrderList";

class AdminDashboard extends React.Component {
  render() {
    return (
      <div className="ui container">
        <Link to="/add-photo">
          <button className="ui olive right labeled right floated icon button">
            Add a photo
            <i className="plus icon"></i>
          </button>
        </Link>
        <h1>Welcome to admin controls</h1>

        <div>
          <OrderList></OrderList>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
