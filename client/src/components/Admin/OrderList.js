import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../actions";
import OrderCard from "./OrderCard";

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

    return (
      <div>
        <OrderCard arr={paid} title="Payment recieved" />
        <OrderCard arr={notPaid} title="Need payment" />
        <OrderCard arr={completed} title="Completed Orders" />
      </div>
    );
  }
}

//function mapStateToProps({ orders }) {
//return { orders };
//}

function mapStateToProps(state) {
  return { orders: Object.values(state.orders) };
}

export default connect(mapStateToProps, { fetchOrders })(OrderList);
