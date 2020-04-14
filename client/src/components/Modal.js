import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui active dimmer">
      <div
        onClick={e => e.stopPropagation()}
        className="ui active centered modal"
        style={{ height: "35%" }}
      >
        <div className="ui header">{props.title}</div>
        <div className="ui image content">
          <span style={{ color: "black" }}>{props.content}</span>
          <div>{props.image}</div>
        </div>
        <div className="ui actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
