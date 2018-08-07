import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/userReducer";

// import './Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let profile_image = this.props.user[0]
      ? this.props.user[0].profile_image
      : "profile image";
    console.log(this.props);

    return (
      <div>
        <nav className="nav_bar">
          <Link className="nav_links" to="">
            <div className="account-image">
              <img
                className="profileImage"
                src={profile_image}
                alt="User Profile Image"
              />
            </div>
          </Link>
          <Link className="nav_links" to="/main/feed">
            News Feed
          </Link>
          <Link className="nav_links" to="">
            My Jobs
          </Link>
          <Link className="nav_links" to="/main/profile">
            My Profile
          </Link>
          <Link className="nav_links" to="">
            Settings
          </Link>
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
