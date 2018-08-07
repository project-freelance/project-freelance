import React, { Component } from "react";
import "./Main.css";

import Nav from "../Main/Nav/Nav";

class Main extends Component {
  render() {
    return (
      <div className="main__container">
        <div className="main__topNav">Main</div>
        <div className="main__sideNav">
          <Nav />
        </div>
        <div className="main__propsContainer">{this.props.children}</div>
      </div>
    );
  }
}

export default Main;
