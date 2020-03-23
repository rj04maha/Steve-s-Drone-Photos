import React, { Component } from "react";
//import PropTypes from "prop-types";
import WizardFormFirstPage from "./Cart";
import WizardFormSecondPage from "./UserForm";
import WizardFormThirdPage from "./Billing";
import { submitOrder } from "../../actions";
import { connect } from "react-redux";

class MasterForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    };
  }

  onSubmit = formValues => {
    //console.log(formValues);
    this.props.submitOrder(formValues);
  };

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;
    return (
      <div>
        {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage} />}
        {page === 2 && (
          <WizardFormSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 3 && (
          <WizardFormThirdPage
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />
        )}
      </div>
    );
  }
}

export default connect(null, { submitOrder })(MasterForm);
