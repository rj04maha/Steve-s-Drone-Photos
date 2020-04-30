import React, { useState, useEffect } from "react";
import CheckInCartButton from "./CheckInCartButton";
import { Link } from "react-router-dom";

const ImageCard = (props) => {
  const [spans, setSpans] = useState(0);
  const [imageIsReady, setImageIsReady] = useState(false);
  const { source, name, _id } = props.image;

  useEffect(() => {
    const img = new Image();

    img.src = source; // by setting an src, trigger browser download
    img.onload = () => {
      // when it finishes loading, update the component state
      const height = (img.height * 250) / img.width;
      const spans = Math.ceil(height / 10) + 1;
      setSpans(spans);
      setImageIsReady(true);
    };

    return () => {
      img.src = null;
    };
  }, [source]);

  if (!imageIsReady) {
    return null;
  } else {
    return (
      <div style={{ gridRowEnd: `span ${spans}` }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <Link to={`/photos/${_id}`}>
            <img
              alt={name}
              src={source}
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
              top: "0",
            }}
          >
            <CheckInCartButton photo={props.image} />
          </div>
        </div>
      </div>
    );
  }
};

export default ImageCard;

/*
import React from "react";
import CheckInCartButton from "./CheckInCartButton";
import { Link } from "react-router-dom";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spans: 0,
      loading: true,
    };
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.setSpans);
  }

  componentWillUnmount() {
    this.imageRef.current.removeEventListener("load", this.setSpans);
    this.imageRef.current = null;
    this.imageRef = null;
  }

  setSpans = () => {
    if (this.imageRef === null) {
      this.setState({ spans: 0 });
    } else {
      const height = this.imageRef.current.clientHeight;
      console.log(height);
      const spans = Math.ceil(height / 10) + 1;
      this.setState({ spans });
    }
    this.setState({ loading: false });
  };

  render() {
    const { name, source, _id } = this.props.image;
    console.log(this.state.spans);
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
              top: "0",
            }}
          >
            <CheckInCartButton photo={this.props.image} />
          </div>
        </div>
      </div>
    );
  }
}

export default ImageCard;
*/
