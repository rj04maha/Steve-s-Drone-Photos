import React from "react";

const About = () => {
  return (
    <div className="ui container space">
      <div className="ui two column stackable grid container">
        <div className="ten wide column">
          <h2 className="ui huge header">About</h2>
          <div className="ui raised segment">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="six wide column">
          <div className="ui centered medium circular left floated image">
            <img
              src="https://scontent-mia3-1.xx.fbcdn.net/v/t1.0-9/67328184_10157398896352152_1054600417482113024_n.jpg?_nc_cat=100&_nc_ohc=thpfrFFCJ-wAX9NdlUe&_nc_ht=scontent-mia3-1.xx&oh=3e775da9fc3a63fbdb4b3852eeaf3d47&oe=5ECFD44C"
              alt="steve balogh selfie"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
