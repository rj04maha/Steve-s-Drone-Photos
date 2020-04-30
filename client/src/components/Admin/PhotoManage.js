import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPhotos } from "../../actions";

const PhotoManage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const photos = useSelector(
    (state) => Object.values(state.photos),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchPhotos());
    };
    fetchData();
    setIsLoading(false);
  }, [dispatch]);

  function renderTags(tags) {
    return tags.map((tag) => {
      return <span key={tag}>[ {tag} ] </span>;
    });
  }

  function renderGrid() {
    photos.reverse();
    return photos.map((image) => {
      const { _id, source, name, tags, location, dateTaken } = image;
      return (
        <div className="item" key={_id}>
          <div className="right floated content">
            <Link to={`/photo/edit/${_id}`}>
              <div className="ui basic olive button">Edit</div>
            </Link>
            <Link to={`/photo/delete/${_id}`}>
              <div className="ui basic red button">Delete</div>
            </Link>
          </div>
          <img className="ui tiny image" src={source} alt={name} />

          <div className="content">
            <div className="header">{name}</div>
            Location: {location}
            <br />
            Date taken: {dateTaken}
            <br />
            Tags: {renderTags(tags)}
          </div>
        </div>
      );
    });
  }

  if (!isLoading && Object.keys(photos).length !== 0) {
    return (
      <div className="ui container" style={{ paddingTop: "1em" }}>
        <div>
          <Link to="/add-photo">
            <button className="ui olive right labeled right floated icon button">
              Add a photo
              <i className="plus icon"></i>
            </button>
          </Link>
          <Link to="/admin">
            <button className="ui button right floated">
              <i className="left arrow icon"></i>Back to dashboard
            </button>
          </Link>
        </div>
        <h1>Manage Photos</h1>

        <div className="ui middle aligned divided list">{renderGrid()}</div>
      </div>
    );
  }
  if (Object.keys(photos).length === 0 && isLoading) {
    return (
      <div className="ui container">
        <Link to="/admin">
          <button className="ui button right floated">
            <i className="left arrow icon"></i>Back to dashboard
          </button>
        </Link>
        <div>There are no photos uploaded</div>
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

export default PhotoManage;
