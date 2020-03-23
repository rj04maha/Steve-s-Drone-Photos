import React from "react";

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }
};

const renderInput = ({ input, meta }) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <input {...input} type="number" min="0" />

      {renderError(meta)}
    </div>
  );
};

export default renderInput;
