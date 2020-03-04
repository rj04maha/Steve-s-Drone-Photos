import React from "react";
import { Link } from "react-router-dom";
//import { connect } from "react-redux";
//import { updateOrder} from "../../actions";

class ViewOrder extends React.Component {
  render() {
    return (
      <div className="ui container">
        <h1>Editing order #{this.props.match.params.id}</h1>
        <div>edit this oder</div>
        <Link to="/admin" className="ui red button">
          Cancel
        </Link>
        <button type="submit" className="ui right floated button">
          Save
        </button>
      </div>
    );
  }
}

export default ViewOrder;

//function mapStateToProps(state, ownProps) {
//return { order: state.orders[ownProps.match.params.id] };
//}

//export default connect(mapStateToProps, { fetchOrder })(EditOrder);
