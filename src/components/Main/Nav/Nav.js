import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/userReducer";
import { getEmployer } from "../../../ducks/employerReducer";
import { getFreelancer } from "../../../ducks/freelancerReducer";
import { getPortfolio } from "../../../ducks/portfolioReducer";

// material icons
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";
import SettingsApplicationsOutlined from "@material-ui/icons/SettingsApplicationsOutlined";
import ExitToApp from "@material-ui/icons/ExitToApp";
import WorkOutline from "@material-ui/icons/WorkOutline";
import ViewList from "@material-ui/icons/ViewList";
import PeopleOutline from "@material-ui/icons/PeopleOutline";

import "./Nav.css";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0
    };
  }
  componentDidMount() {
    this.props
      .getUser()
      .then(() => this.setState({ id: this.props.user[0].id }))
      .then(() =>
        this.props
          .getEmployer(this.props.user[0].id)
          .then(() => this.props.getFreelancer(this.props.user[0].id))
          .then(() => this.props.getPortfolio(this.props.user[0].id))
      );
  }

  render() {
    //console.log(this.props);
    let profile_image = this.props.user[0]
      ? this.props.user[0].profile_image
      : "profile image";
    let first_name = this.props.user[0]
      ? this.props.user[0].first_name
      : "first Name";

    let last_name = this.props.user[0]
      ? this.props.user[0].last_name
      : "last Name";

    let id = this.props.user[0] ? this.props.user[0].id : 0;

    return (
      <div className="nav__container">
        <nav className="nav__bar">
          <div className="nav__accountImage">
            <img
              className="nav__profileImage"
              src={profile_image}
              alt="User Profile Image"
            />
            <div className="nav__accountName">
              <h3>
                {first_name}
                {"  "} {last_name}
              </h3>
            </div>
          </div>

          <div className="nav__linkContainer">
            <div className="nav__links">
              <Link to="/main/feed">
                <ViewList
                  style={{ marginBottom: "-6px", marginRight: "10px" }}
                />
                News Feed
              </Link>
            </div>
            <div className="nav__links">
              <Link to="/main/appliedjobs">
                <WorkOutline
                  style={{ marginBottom: "-6px", marginRight: "10px" }}
                />
                My Jobs
              </Link>
            </div>
            <div className="nav__links">
              <Link to="/main/freelancers">
                <PeopleOutline
                  style={{ marginBottom: "-6px", marginRight: "10px" }}
                />
                Search Freelancers
              </Link>
            </div>
            <div className="nav__links">
              <Link to={`/main/myprofile/${id}`}>
                <AccountCircleOutlined
                  style={{ marginBottom: "-6px", marginRight: "10px" }}
                />
                My Profile
              </Link>
            </div>
            <div className="nav__links">
              <Link to="/main/settings">
                <SettingsApplicationsOutlined
                  style={{ marginBottom: "-6px", marginRight: "10px" }}
                />
                Settings
              </Link>
            </div>
            <div className="nav__links">
              <a href="http://localhost:3001/logout">
                <ExitToApp
                  style={{ marginBottom: "-6px", marginRight: "10px" }}
                />
                logout
              </a>
            </div>
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
  { getUser, getEmployer, getFreelancer, getPortfolio }
)(Nav);
// export default Nav;
