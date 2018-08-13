import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/userReducer";
import ReactS3Uploader from "react-s3-uploader";
import { updateUser } from "../../../ducks/userReducer";
import { updateFreelancer } from "../../../ducks/freelancerReducer";
import { updateEmployer } from "../../../ducks/employerReducer";

// Material UI
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/NativeSelect";
import LinearProgress from "@material-ui/core/LinearProgress";
// Material UI

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
    console.log(this.state);
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
    console.log(this.state);
  };
  handleExperienceChange = experience => event => {
    this.setState({
      [experience]: event.target.value
    });
    console.log(this.state);
  };

  onPictureUpload = s3 => {
    this.setState({
      profile_image: process.env.REACT_APP_DEV_S3_URL + s3.filename
    });
  };
  onSaveHandler = () => {
    this.props.updateUser(this.state).then(() => {
      if (this.props.user[0].role === "Freelancer") {
        this.props.updateFreelancer(this.props.user[0].id, this.state);
      } else {
        this.props.updateEmployer(this.props.user[0].id, this.state);
      }
    });
  };

  // progress bar
  progress = percent => {
    console.log(percent);
    const { completed } = this.state;
    if (completed === 100) {
      window.setTimeout(() => this.setState({ completed: 0 }), 1000);
    } else {
      this.setState({
        completed: percent
      });
    }
  };
  // logError = e => {
  //   console.log(e);
  // };

  //end progress bar
  settingDecider = () => {
    if (this.props.user[0].role == "Freelancer") {
      return <FreelancerSettings />;
    } else {
      return <EmployerSettings />;
    }
  };
  render() {
    let {
      last_name,
      first_name,
      email,
      profile_image,
      company_image,
      experience,
      city,
      bio,
      state,
      heading
    } = this.state;

    let settingShow = this.settingDecider();

    return (
      <div className="settings__container--conditional">{settingShow}</div>
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
  { getUser, updateUser, updateEmployer, updateFreelancer }
)(Settings);
