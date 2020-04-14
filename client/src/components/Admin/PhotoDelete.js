import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import { fetchPhoto, deletePhoto } from "../../actions";

const PhotoDelete = props => {
  const photo = useSelector(
    state => state.photos[props.match.params.id],
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchPhoto(props.match.params.id));
    };
    fetchData();
  }, [props.match.params.id, dispatch]);

  function renderActions() {
    if (!photo) {
      return (
        <Link to="/manage-photos">
          <div className="ui button">Cancel</div>
        </Link>
      );
    } else {
      return (
        <>
          <div
            onClick={() => dispatch(deletePhoto(props.match.params.id))}
            className="ui red button"
          >
            Delete
          </div>
          <Link to="/manage-photos">
            <div className="ui button">Cancel</div>
          </Link>
        </>
      );
    }
  }

  function renderContent() {
    if (!photo) {
      return `The photo with id ${props.match.params.id} is not found.`;
    } else {
      return `Are you sure you want to delete this photo: ${photo.name}?`;
    }
  }

  function renderImage() {
    if (!photo) {
      return "";
    } else {
      return (
        <img
          className="ui image right floated"
          src={photo.source}
          alt={photo.name}
          style={{ height: "5em", width: "auto" }}
        />
      );
    }
  }

  return (
    <Modal
      title="Delete Photo"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push("/manage-photos")}
      image={renderImage()}
    />
  );
};
export default PhotoDelete;
