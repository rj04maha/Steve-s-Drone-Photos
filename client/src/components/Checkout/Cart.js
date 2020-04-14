import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartForm from "./CartForm";

// delete later
//import { fetchPhotos } from "../../actions";

const Cart = (props) => {
  const cart = useSelector((state) => Object.values(state.cart));

  //delete later
  /*  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchPhotos());
    };

    fetchData();
  }, [dispatch]);

  const cart = useSelector((state) => Object.values(state.photos));
 */
  ////

  if (cart.length > 0) {
    return (
      <div className="ui container">
        <h1>Cart</h1>
        <CartForm
          photos={cart}
          button="Checkout"
          checkoutButton={props.onSubmit}
        />
      </div>
    );
  } else {
    return (
      <div>
        <div className="ui container space">
          <h2 className="ui huge header">Your cart</h2>
          <p>Your cart is empty please select photos to order</p>
          <Link to="/photos">
            <button className="ui button">
              Check them out here<i className="right chevron icon"></i>
            </button>
          </Link>
        </div>
      </div>
    );
  }
};

export default Cart;
