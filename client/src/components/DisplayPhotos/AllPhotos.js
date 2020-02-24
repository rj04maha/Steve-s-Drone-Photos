import React from "react";
import ImageGrid from "./ImageGrid";
import CartView from "./CartView";

class AllPhotos extends React.Component {
  render() {
    return (
      <div className="space">
        <CartView />
        <ImageGrid />
      </div>
    );
  }
}

export default AllPhotos;
