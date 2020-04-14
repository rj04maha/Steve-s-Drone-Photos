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
          arr={notPaid}
          title="New orders"
          alert={
            <div>
              <i className="red attention icon"></i>Need to collect payment
            </div>
          }
        />
        <OrderTable
          arr={paid}
          title="Recieved payment"
          alert={
            <div>
              <i className="yellow attention icon"></i>Send customers their
              photo(s)
            </div>
          }
        />

        <OrderTable
          arr={notPaidButShipped}
          title="Photo(s) have been sent, but customer did not pay"
          alert={
            <div>
              <i className="red attention icon"></i>Need to collect payment
            </div>
          }
        />
        <OrderTable
          arr={completed}
          title="Completed orders"
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
