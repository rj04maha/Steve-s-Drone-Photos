import React from "react";
//import { Link } from "react-router-dom";
//import AddAPhoto from "./AddAPhoto";
import OrderList from "./OrderList";

class AdminDashboard extends React.Component {
  render() {
    return (
      <div className="ui container">
        <h1>Welcome to admin controls</h1>
        <div className="ui pointing menu">
          <a href="/" className="item active">
            Orders
          </a>
          <a href="/" className="item">
            Add a new photo
          </a>
          <div className="right menu">
            <div className="item">
              <div className="ui transparent icon input">
                <input type="text" placeholder="Search..."></input>
                <i className="search link icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div>
          <OrderList></OrderList>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
