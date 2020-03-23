import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrder } from "../../actions";

//updateOrder
class OrderEdit extends React.Component {
  componentDidMount() {
    this.props.fetchOrder(this.props.match.params.id);
  }
  render() {
    return (
      <div className="ui container">
        <h1>Editing order #{this.props.match.params.id}</h1>
        {console.log(this.props.match.params)}
        <div>edit this oder</div>
        <Link to="/admin" className="ui button">
          Go back
        </Link>
        <button type="submit" className="ui right floated button">
          Save
        </button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return { order: state.orders[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchOrder })(OrderEdit);
