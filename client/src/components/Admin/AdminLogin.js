import React from "react";
import { connect } from "react-redux";
import { adminLogin } from "../../actions";

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    };
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };
  onSubmit = event => {
    event.preventDefault();
    //alert(this.state.password);
    adminLogin(JSON.stringify(this.state));
  };

  render() {
    return (
      <div className="ui container">
        <h1>Admin Login</h1>
        <div className="ui placeholder segment">
          <form onSubmit={this.onSubmit}>
            <div className="ui action input">
              <input
                type="password"
                name="password"
                className="ui labeled input"
                placeholder="Enter password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
              />
              <input className="ui button" type="submit" value="Login" />
            </div>
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

/* handleSubmit(pwd) {
    adminLogin(pwd);
  }

  //const {password} = this.props

  render() {
    return (
      <div className="ui container">
        <div className="ui placeholder segment">
          <form onSubmit={() => console.log("hi")}>
            <Field
              name="password"
              component="input"
              type="text"
              placeholder="Password"
              className="ui labeled input"
            />
            <button type="submit" className="ui button">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
 */
/* function mapStateToProps(state) {
  return { adminLogin: state.adminLogin };
}

const formWrapper = reduxForm({
  form: "adminLogin"
})(AdminLogin);

const selector = formValueSelector("adminLogin");

const SelectingFormValuesForm = connect(state => {
  // can select values individually
  const pwd = selector(state, "password");
  return pwd;
})(formWrapper);

export default connect(mapStateToProps, { adminLogin })(
  SelectingFormValuesForm
); export default AdminLogin;*/
