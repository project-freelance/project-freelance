import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/userReducer";

import "./Nav.css";

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let profile_image = this.props.user[0]
      ? this.props.user[0].profile_image
      : "profile image";
    let first_name = this.props.user[0]
      ? this.props.user[0].first_name
      : "first Name";

    let last_name = this.props.user[0]
      ? this.props.user[0].last_name
      : "last Name";

    return (
      <div className="nav__container">
        <nav className="nav__bar">
          <div className="nav__accountImage">
            <img
              className="nav__profileImage"
              src={profile_image}
              alt="User Profile Image"
            />
            <div>
              <h3>
                {first_name}
                {"  "} {last_name}
              </h3>
            </div>
          </div>

          <div>
            <Link className="nav__links" to="/main/feed">
              News Feed
            </Link>
          </div>
          <div>
            <Link className="nav__links" to="">
              My Jobs
            </Link>
          </div>
          <div>
            <Link className="nav__links" to="/main/profile">
              My Profile
            </Link>
          </div>
          <div>
            <Link className="nav__links" to="/main/settings">
              Settings
            </Link>
          </div>
          <div>
            <a href="http://localhost:3001/logout">logout</a>
          </div>
        </nav>
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
  {}
)(Nav);
// export default Nav;
