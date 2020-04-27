import React from "react";
import { connect } from "react-redux";
import { adminLogin } from "../../actions";

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      error: false,
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (event) => {
    event.preventDefault();
    adminLogin(JSON.stringify(this.state));
    this.setState({ error: true });
  };

  renderError = () => {
    if (this.state.error) {
      return (
        <div className="ui negative message">
          <div className="header">Incorrect password</div>
          <p>Please try again</p>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="ui container">
        <h1>Admin Login</h1>
        <div className="ui placeholder very padded segment">
          <form onSubmit={this.onSubmit}>
            <div className="ui fluid action input">
              <input
                type="password"
                name="password"
                className="ui labeled input"
                placeholder="Enter password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
              />
              <button className="ui button" type="submit">
                Login
              </button>
            </div>
            {this.renderError()}
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { adminLogin: state.adminLogin };
}

export default connect(mapStateToProps, { adminLogin })(AdminLogin);
