import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./Main.css";
import { getUser } from "../../ducks/userReducer";

import Nav from "../Main/Nav/Nav";

class Main extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.getUser().then(() => {});
  }
  render() {
    return (
      <div className="main__container">
        {/* <div className="main__topNav">Main</div> */}
        <div className="main__sideNav">
          <Nav />
        </div>
        <div className="main__propsContainer">{this.props.children}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}
export default connect(
  mapStateToProps,
  { getUser }
)(Main);
