import React, { Component } from "react";
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
    this.props.getUser().then(() => {
      console.log(this.props);
    });
  }
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

function mapStateToProps(state) {
  return {
    ...state.userReducer
  };
}
export default connect(
  mapStateToProps,
  { getUser }
)(Main);
