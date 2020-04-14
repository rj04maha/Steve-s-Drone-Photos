import React from "react";
import { Link } from "react-router-dom";
import OrderList from "./OrderList";

class AdminDashboard extends React.Component {
  render() {
    return (
      <div className="ui container" style={{ paddingTop: "1em" }}>
        <Link to="/add-photo">
          <button className="ui olive right labeled right floated icon button">
            Add a photo
            <i className="plus icon"></i>
          </button>
        </Link>
        <Link to="/manage-photos">
          <button className="ui right floated button">Manage Photos</button>
        </Link>
        <h1>Admin dashboard</h1>

        <div>
          <OrderList></OrderList>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
