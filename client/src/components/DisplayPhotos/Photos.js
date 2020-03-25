import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import ImageCard from "./ImageCard";
import { fetchPhotos } from "../../actions";

const imageGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gridGap: "0 10px",
  gridAutoRows: "10px",
  margin: "20px"
};

const Photos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const photos = useSelector(
    state => Object.values(state.photos),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchPhotos());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  function renderGrid() {
    return photos.map(image => {
      return <ImageCard key={image._id} image={image} />;
    });
  }

  if (!isLoading && Object.keys(photos).length !== 0) {
    return (
      <div className="ui container">
        <div className="image-list" style={imageGrid}>
          {renderGrid()}
        </div>
      </div>
    );
  } else {
    return (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading</div>
      </div>
    );
  }
};

export default Photos;
