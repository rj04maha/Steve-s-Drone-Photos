import React from "react";
//import { connect } from "react-redux";
//import {Image,Video,Transformation,CloudinaryContext} from "cloudinary-react";
//import { selectPhoto } from "../../actions";
import CheckInCartButton from "./CheckInCartButton";
import { Link } from "react-router-dom";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spans: 0
    };
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.setSpans);
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight;
    const spans = Math.ceil(height / 10) + 1;
    this.setState({ spans });
  };

  render() {
    const { name, source, _id } = this.props.image;
    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <Link to={`/photos/${_id}`}>
            <img
              alt={name}
              src={source}
              ref={this.imageRef}
              key={_id}
              style={{ cursor: "pointer", width: "250px" }}
            />
          </Link>

          <div
            style={{
              paddingTop: "7px",
              paddingRight: "7px",
              position: "absolute",
              right: "0",
              top: "0"
            }}
          >
            <CheckInCartButton photo={this.props.image}></CheckInCartButton>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageCard;
