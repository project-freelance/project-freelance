import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/userReducer";
import { updateUser } from "../../../ducks/userReducer";
import { updateFreelancer } from "../../../ducks/freelancerReducer";
import { updateEmployer, getEmployer } from "../../../ducks/employerReducer";

import "./Settings.css";
import FreelancerSettings from "./FreelancerSettings/FreelancerSettings";
import EmployerSettings from "./EmployerSettings/EmployerSettings";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: this.props.user[0].first_name,
      last_name: this.props.user[0].last_name,
      email: this.props.user[0].email,
      role: this.props.user[0].role,
      experience: 0,
      city: "",
      state: "",
      profile_image: this.props.user[0].profile_image,
      company_image: "",
      completed: 0,
      percent: 0,
      bio: "",
      heading: ""
    };
  }
  componentDidMount() {
    // this.props.getEmployer(this.props.user[0].id);
  }

  settingDecider = () => {
    if (this.props.user[0].role == "Freelancer") {
      console.log(this.props.user[0].role);
      return <FreelancerSettings />;
    } else {
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
  { getUser, updateEmployer, updateFreelancer, getEmployer }
)(Settings);
