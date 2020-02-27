import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPhotos } from "../actions";
import history from "../history";
import Home from "./Home";
import Header from "./Header";
import AllPhotos from "./DisplayPhotos/AllPhotos";
import About from "./About";
import Contact from "./Contact";
import Cart from "./Checkout/Cart";
import Checkout from "./Checkout/Checkout";
import Footer from "./Footer";
import AdminDashboard from "./Admin/AdminDashboard";
import editOrder from "./Admin/EditOrder";

const content = {
  paddingBottom: "6rem"
};

class App extends React.Component {
  componentDidMount() {
    this.props.fetchPhotos();
  }
  render() {
    return (
      <div style={content}>
        <Router history={history}>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/photos" exact component={AllPhotos} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/admin" exact component={AdminDashboard} />
          <Route path="/orders/edit/:id" exact component={editOrder} />
          <Footer />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { photos: state.photos };
};

export default connect(mapStateToProps, { fetchPhotos })(App);
