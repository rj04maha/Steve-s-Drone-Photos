import React from "react";

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }
};

const renderInput = ({ input, label, meta }) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <input {...input} placeholder={label} />

      {renderError(meta)}
    </div>
  );
};

export default renderInput;
