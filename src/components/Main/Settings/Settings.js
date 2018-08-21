import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/userReducer";
import axios from "axios";

import "./Settings.css";
import FreelancerSettings from "./FreelancerSettings/FreelancerSettings";
import EmployerSettings from "./EmployerSettings/EmployerSettings";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: ""
    };
  }

  componentDidMount() {
    axios
      .get("/api/user")
      .then(response => this.setState({ role: response.data[0].role }));
  }

  settingDecider = () => {
    if (this.state.role === "Freelancer") {
      return <FreelancerSettings />;
    } else if (this.state.role === "Employer") {
      return <EmployerSettings />;
    }
  };
  render() {
    let settingShow = this.settingDecider();

    return (
      <div className="settings__container--conditional">{settingShow}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    employer: state.employerReducer.employer
  };
}
export default connect(
  mapStateToProps,
  { getUser }
)(Settings);
