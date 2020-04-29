import React from "react";
import PhoneInput from "react-phone-input-auto-format";

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }
};

const renderPhoneInput = ({ input, meta, onChangeInput }) => {
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <PhoneInput {...input} onChange={onChangeInput} />

      {renderError(meta)}
    </div>
  );
};

export default renderPhoneInput;
