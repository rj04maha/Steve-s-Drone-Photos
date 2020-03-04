import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../actions";
import OrderTable from "./OrderTable";

class OrderList extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    const completed = this.props.orders.filter(
      order => order.fullfilled && order.paid
    );

    const paid = this.props.orders.filter(
      order => !order.fullfilled && order.paid
    );
    const notPaid = this.props.orders.filter(
      order => !order.fullfilled && !order.paid
    );

    const notPaidButShipped = this.props.orders.filter(
      order => order.fullfilled && !order.paid
    );
    return (
      <div>
        <OrderTable
          arr={paid}
          title="Ready to ship"
          alert={
            <div>
              <i className="yellow attention icon"></i>Send customers their
              photo
            </div>
          }
        />
        <OrderTable
          arr={notPaid}
          title="Need payment"
          alert={
            <div>
              <i className="red attention icon"></i>Customers did not pay
            </div>
          }
        />
        <OrderTable
          arr={notPaidButShipped}
          title="Shipped but did not pay"
          alert={
            <div>
              <i className="red attention icon"></i>Customers did not pay but
              you sent them their photo anyways
            </div>
          }
        />
        <OrderTable
          arr={completed}
          title="Completed Orders"
          alert={
            <div>
              <i className="green attention icon"></i>These orders are
              completed!
            </div>
          }
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { orders: Object.values(state.orders) };
}

export default connect(mapStateToProps, { fetchOrders })(OrderList);
