import React from "react";

export default (props) => {
  return (
    <div
      className="ui segment"
      style={{
        position: "-webkit-sticky",
        position: "sticky",
        top: "8em",
      }}
    >
      <h2>Summary</h2>
      <div style={{ float: "right" }}>${props.totes}.00</div>
      <div>Subtotal </div>
      <div style={{ float: "right" }}>${props.handlingCost}.00</div>
      <div> Shipping & Handling </div>
      <div className="ui divider"></div>
      <h3 style={{ float: "right" }}>${props.totes + props.handlingCost}.00</h3>
      <h3>Total </h3>
      <div className="ui divider"></div>
      {props.buttons}
    </div>
  );
};
