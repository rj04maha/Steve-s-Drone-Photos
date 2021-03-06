import React from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";
import Home from "./Home";
import Header from "./Header";
import Photos from "./DisplayPhotos/Photos";
import PhotoDetail from "./DisplayPhotos/PhotoDetail";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminLogin from "./Admin/AdminLogin";
import OrderView from "./Admin/OrderView";
import MasterForm from "./Checkout/MasterForm";
import OrderComplete from "./Checkout/OrderComplete";
import PhotoAdd from "./Admin/PhotoAdd";
import PhotoEdit from "./Admin/PhotoEdit";
import PhotoDelete from "./Admin/PhotoDelete";
import PhotoManage from "./Admin/PhotoManage";
import WithAuth from "./WithAuth";

const content = {
  paddingBottom: "6rem",
};

class App extends React.Component {
  render() {
    return (
      <div style={content}>
        <Router history={history}>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/photos" exact component={Photos} />
          <Route path="/photos/:id" exact component={PhotoDetail} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/cart" exact component={MasterForm} />
          <Route path="/order-complete" exact component={OrderComplete} />
          <Route path="/admin-login" exact component={AdminLogin} />
          <Route
            path="/orders/view/:id"
            exact
            component={WithAuth(OrderView)}
          />
          <Route path="/add-photo" exact component={WithAuth(PhotoAdd)} />
          <Route path="/photo/edit/:id" exact component={WithAuth(PhotoEdit)} />
          <Route
            path="/photo/delete/:id"
            exact
            component={WithAuth(PhotoDelete)}
          />
          <Route
            path="/manage-photos"
            exact
            component={WithAuth(PhotoManage)}
          />
          <Route path="/admin" exact component={WithAuth(AdminDashboard)} />

          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
