import React from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";
import Home from "./Home";
import Header from "./Header";
import Photos from "./DisplayPhotos/Photos";
import PhotoDetail from "./DisplayPhotos/PhotoDetail";
import About from "./About";
import Contact from "./Contact";
//import Cart from "./Checkout/Cart";
//import Checkout from "./Checkout/Checkout";
import Footer from "./Footer";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminLogin from "./Admin/AdminLogin";
import OrderView from "./Admin/OrderView";
import MasterForm from "./Checkout/MasterForm";
import PhotoAdd from "./Admin/PhotoAdd";
import PhotoEdit from "./Admin/PhotoEdit";
import PhotoDelete from "./Admin/PhotoDelete";
import PhotoManage from "./Admin/PhotoManage";
//import WithAuth from "./WithAuth";

const content = {
  paddingBottom: "6rem"
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
          <Route path="/admin-login" exact component={AdminLogin} />
          <Route path="/admin" exact component={AdminDashboard} />
          <Route path="/orders/view/:id" exact component={OrderView} />
          <Route path="/add-photo" exact component={PhotoAdd} />
          <Route path="/photo/edit/:id" exact component={PhotoEdit} />
          <Route path="/photo/delete/:id" exact component={PhotoDelete} />
          <Route path="/manage-photos" exact component={PhotoManage} />
          {/* <Route path="/admin" exact component={WithAuth(AdminDashboard)} />
          <Route
            path="/orders/view/:id"
            exact
            component={WithAuth(ViewOrder)}
          /> */}
          <Footer />
        </Router>
      </div>
    );
  }
}
//<Route path="/checkout" exact component={Checkout} />

export default App;
