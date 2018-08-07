import React, { Component } from "react";

import Nav from "../Main/Nav/Nav";

class Main extends Component {
  render() {
    return (
      <div>
        <div>
          <Nav />
        </div>
        <div>{this.props.children}</div>
        Main
      </div>
    );
  }
}

export default Main;
