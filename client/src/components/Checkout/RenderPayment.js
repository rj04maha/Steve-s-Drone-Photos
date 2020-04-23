import React from "react";

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }
};

const payments = ["Paypal", "Venmo"];

const renderPayment = ({ input, meta }) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;

  return (
    <div className={className}>
      <select {...input}>
        <option value="">Select a payment option...</option>
        {payments.map((val) => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>
      {renderError(meta)}
    </div>
  );
};

export default renderPayment;
