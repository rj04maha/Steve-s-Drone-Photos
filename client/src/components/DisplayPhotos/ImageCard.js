import React from "react";
import { connect } from "react-redux";
import { addToCart, removeFromCart, selectPhoto } from "../../actions";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spans: 0,
      isHovering: false
    };
    this.imageRef = React.createRef();
    //this.handleMouseHover = this.handleMouseHover.bind(this);
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
    const { description, urls, id } = this.props.image;
    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
        <div className="card">
          <img
            alt={description}
            src={urls.regular}
            ref={this.imageRef}
            key={id}
            onClick={() => this.props.selectPhoto(this.props.image)}
            style={{ cursor: "pointer" }}
          />
          <div className="edit">
            {this.props.inCart ? (
              <button
                className="ui right labeled icon olive tiny button icon-button-cart"
                onClick={() => this.props.removeFromCart(id)}
              >
                <i className="white big check icon link"></i>IN CART
              </button>
            ) : (
              <button
                className="ui right labeled icon tiny button icon-button"
                onClick={() => this.props.addToCart(this.props.image)}
              >
                <i className="big plus circle icon link"></i>ADD TO CART
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { cart: state.cart, selectPhoto: state.selectPhoto };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: photo => {
      dispatch(addToCart(photo));
    },
    removeFromCart: photoId => {
      dispatch(removeFromCart(photoId));
    },
    selectPhoto: photo => {
      dispatch(selectPhoto(photo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageCard);

/* import React from "react";
import { connect } from "react-redux";
import { addToCart, removeFromCart, selectPhoto } from "../../actions";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spans: 0,
      isHovering: false
    };
    this.imageRef = React.createRef();
    //this.handleMouseHover = this.handleMouseHover.bind(this);
  }

  /*  handleMouseHover() {
    if (this.isHovering) {
      this.setState({ isHovering: true });
    }
    this.setState({ isHovering: false });
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
    const { description, urls, id } = this.props.image;
    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
        <div className="card">
          <img
            alt={description}
            src={urls.regular}
            ref={this.imageRef}
            key={id}
            onMouseEnter={() => this.setState({ isHovering: true })}
            onMouseLeave={() => this.setState({ isHovering: false })}
          />
          {this.state.isHovering && (
            <div
              class="ui basic bottom attached massive label"
              onClick={() => this.props.selectPhoto(this.props.image)}
              style={{ cursor: "pointer", opacity: "0.5" }}
              onMouseEnter={() => this.setState({ isHovering: true })}
              onMouseLeave={() => this.setState({ isHovering: false })}
            >
              SEE MORE DETAILS
            </div>
          )}
          <div className="edit">
            {this.props.inCart ? (
              <button
                className="ui right labeled icon olive tiny button icon-button-cart"
                onClick={() => this.props.removeFromCart(id)}
              >
                <i className="white big check icon link"></i>IN CART
              </button>
            ) : (
              <button
                className="ui right labeled icon tiny button icon-button"
                onClick={() => this.props.addToCart(this.props.image)}
              >
                <i className="big plus circle icon link"></i>ADD TO CART
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { cart: state.cart, selectPhoto: state.selectPhoto };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: photo => {
      dispatch(addToCart(photo));
    },
    removeFromCart: photoId => {
      dispatch(removeFromCart(photoId));
    },
    selectPhoto: photo => {
      dispatch(selectPhoto(photo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageCard);
 */
