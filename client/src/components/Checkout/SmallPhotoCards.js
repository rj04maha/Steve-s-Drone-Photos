import React from "react";

const SmallPhotoCards = (props) => {
  const { name, source, digital, copy11x14, copy13x19 } = props;
  return (
    <div className="ui card">
      <div className="content">
        <img alt={name} src={source} className="right floated tiny ui image" />
        <div className="header">{name}</div>

        <div className="meta"> {digital ? "Digital" : null}</div>
        <div className="meta">
          {copy11x14 ? `11" x 14" QTY: ${copy11x14}` : null}
        </div>
        <div className="meta">
          {copy13x19 ? `13" x 19" QTY: ${copy13x19}` : null}
        </div>
      </div>
    </div>
  );
};

export default SmallPhotoCards;
