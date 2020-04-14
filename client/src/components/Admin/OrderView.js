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
        _id
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
/*   state = {
    paidCheck: null,
    fullfilledCheck: null,
    //updates: null,
    data: null
  }; 

  componentDidMount() {
    this.props.fetchOrder(this.props.match.params.id);
         const orderId = this.props.match.params.id;
    const { fullfilled, paid } = this.props.orders[orderId];

    this.setState({ data: this.props.orders[orderId] });

    this.setState({ paidCheck: paid });
    this.setState({ fullfilledCheck: fullfilled }); 
  }
  
  paidHandleCheck() {
    this.setState({ paidChecked: !this.state.paidChecked });
  }

  fullfilledHandleCheck() {
    console.log(this.state.data);
    //this.setState({ fullfilledChecked: !this.state.fullfilledChecked });
  } 

  render() {
    console.log(this.props);
    if (!this.props.order) {
      return <div>hey</div>;
    } else {
      return <div>Loading...</div>;
    }
  }
}
//console.log(this.state);
 if (this.state.data) {
      const {
        firstName,
        lastName,
        email,
        datePlaced,
        phone,
        fullfilled,
        photos,
        customerNote,
        adminNote,
        paid,
        _id
      } = this.state.data;

      const updatedFields = null; //fix me

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
                <td>{datePlaced}</td>
              </tr>
              <tr>
                <td className="collapsing">Phone number</td>
                <td>{phone}</td>
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
                <td>
                  <div className="ui checked checkbox">
                    <input
                      type="checkbox"
                      onChange={this.fullfilledHandleCheck}
                      defaultChecked={this.state.fullfilledCheck}
                    ></input>
                    <label>Yes</label>
                  </div>
                  <div className="ui checked checkbox">
                    <input
                      type="checkbox"
                      onChange={this.fullfilledHandleCheck}
                      defaultChecked={this.state.fullfilledCheck}
                    ></input>
                    <label>No</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="collapsing">Paid</td>
                <td>{paid}</td>
              </tr>
            </tbody>
          </table>
          <Link to="/admin" className="ui red button">
            Go Back
          </Link>
          <button
            onClick={() => this.props.updateOrder(_id, updatedFields)}
            className="ui right floated button"
          >
            Update
          </button>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    } 
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    order: state.orders[ownProps.match.params.id]
  };
};
export default connect(mapStateToProps, { updateOrder, fetchOrder })(ViewOrder);
*/
