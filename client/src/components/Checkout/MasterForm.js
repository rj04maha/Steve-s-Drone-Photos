import React, { useState } from "react";
import { useDispatch } from "react-redux";
import WizardFormFirstPage from "./Cart";
import WizardFormSecondPage from "./CustomerInfoForm";
import WizardFormThirdPage from "./ConfirmOrder";
import { submitOrder } from "../../actions";
import { connect } from "react-redux";
import { reset } from "redux-form";

const MasterForm = (props) => {
  const [page, setPage] = useState(1);
  const [isShipping, setShipping] = useState(false);

  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  function onSubmitFunction(formValues) {
    formValues.total = total;
    console.log(formValues);
    props.submitOrder(formValues).then(() => {
      dispatch(reset("orderForm"));
    });
  }

  const setMasterStates = (ship, totes) => {
    setShipping(ship);
    setTotal(totes);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };
  return (
    <div>
      {page === 1 && (
        <WizardFormFirstPage
          onSubmit={nextPage}
          setMasterStates={setMasterStates}
        />
      )}
      {page === 2 && (
        <WizardFormSecondPage
          previousPage={previousPage}
          onSubmit={nextPage}
          totals={total}
          isShipping={isShipping}
        />
      )}
      {page === 3 && (
        <WizardFormThirdPage
          previousPage={previousPage}
          onSubmit={onSubmitFunction}
          totals={total}
          isShipping={isShipping}
        />
      )}
    </div>
  );
};

export default connect(null, { submitOrder })(MasterForm);
