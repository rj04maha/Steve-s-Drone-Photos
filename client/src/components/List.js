import React from "react";

const List = props => {
  return (
    <div className="ui list">
      {props.arr.map(listItem => {
        return (
          <div className="item black" key={listItem.toString()}>
            <i className="right triangle icon"></i>
            {listItem}
          </div>
        );
      })}
    </div>
  );
};

export default List;
