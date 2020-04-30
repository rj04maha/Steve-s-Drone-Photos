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
    window.scrollTo(0, 0);
    const fetchData = async () => {
      dispatch(fetchPhoto(photoId));
      setIsLoading(false);
    };
    fetchData();
  }, [photoId, dispatch]);

  function renderTags(tags) {
    return tags.map((tag) => {
      return (
        <span className="ui tag label" key={tag} style={{ marginTop: ".2em" }}>
          {tag.toUpperCase()}
        </span>
      );
    });
  }

  function getDate(date) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dateSplit = date.split("-");
    const month = monthNames[Number(dateSplit[1]) - 1];
    return `${month} ${Number(dateSplit[2])}, ${dateSplit[0]}`;
  }

  if (!isLoading && photo) {
    const { name, source, tags, location, dateTaken } = photo;
    return (
      <div className="ui container" style={{ paddingTop: "1em" }}>
        <div className="ui stackable two column grid">
          <div className="column">
            <img className="ui centered large image" src={source} alt={name} />
          </div>
          <div className="column">
            <h1 style={{ paddingTop: "2em" }}>{name}</h1>
            <p>
              <strong>Location: </strong>
              {location}
            </p>
            <p>
              <strong>Date Taken: </strong> {getDate(dateTaken)}
            </p>
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
  } else {
    return (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading</div>
      </div>
    );
  }
};

export default PhotoDetail;
