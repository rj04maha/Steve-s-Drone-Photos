import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import CheckInCartButton from "./CheckInCartButton";
import { fetchPhoto } from "../../actions";

const PhotoDetail = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const photoId = props.match.params.id;
  const photo = useSelector((state) => state.photos[photoId], shallowEqual);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchPhoto(photoId));
      setIsLoading(false);
    };
    fetchData();
  }, [photoId, dispatch]);

  function renderTags(tags) {
    return tags.map((tag) => {
      return (
        <span className="ui tag label" key={tag}>
          {tag}
        </span>
      );
    });
  }

  if (!isLoading && photo) {
    const { name, source, tags, location, dateTaken } = photo;
    return (
      <div className="ui container" style={{ paddingTop: "1em" }}>
        <div className="ui stackable two column grid">
          <div className="column ten wide">
            <img className="ui centered large image" src={source} alt={name} />
          </div>
          <div className="column six wide">
            <h1>{name}</h1>
            <p>{location}</p>
            <p>{dateTaken}</p>
            <p>{renderTags(tags)}</p>
            <CheckInCartButton photo={photo}></CheckInCartButton>
            <br />
            <div>
              <Link to="/photos">
                <i className="left arrow icon"></i>
                Back to all photos
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
    /* return (
      <div className="ui container">
        <Link to="/photos">
          <button className="ui labeled icon tiny button">
            <i className="left arrow icon"></i>
            ALL PHOTOS
          </button>
        </Link>
        <div style={{ float: "right" }}>
          <CheckInCartButton photo={photo}></CheckInCartButton>
        </div>
        <img className="ui centered large image" src={source} alt={name}></img>
        <div style={{ textAlign: "center" }}>
          <h3>{name}</h3>
          <p>Tags: {tags}</p>
        </div>
      </div>
    ); */
  } else {
    return (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading</div>
      </div>
    );
  }
};

export default PhotoDetail;
