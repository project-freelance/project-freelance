import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/userReducer";
// Material UI
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
// Material UI

import "./Settings.css";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: this.props.user[0].first_name,
      last_name: this.props.user[0].last_name,
      email: this.props.user[0].email,
      experience: 0,
      profile_image: this.props.user[0].profile_image
    };
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
  render() {
    let {
      last_name,
      first_name,
      email,
      profile_image,
      experience
    } = this.state;
    return (
      <div>
        <h1>Settings</h1>
        <div>
          <img
            className="settings__profileImage"
            src={profile_image}
            alt="User Profile Image"
          />
          <ul>
            <li>First Name: {first_name} </li>
            <li>Last Name: {last_name}</li>
          </ul>
        </div>
        <div>
          <form
            className={"settings__formContainer"}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="First Name"
              label="First Name"
              className={"settings__firstName__input"}
              value={first_name}
              onChange={e => this.setState({ first_name: e.target.value })}
              margin="normal"
            />
            <TextField
              id="Last Name"
              label="Last Name"
              className={"settings__lastname__input"}
              value={last_name}
              onChange={e => this.setState({ last_name: e.target.value })}
              margin="normal"
            />
            <TextField
              id="name"
              label="email"
              className={"settings__email__input"}
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              margin="normal"
            />
            <FormControl className={"form"}>
              <NativeSelect
                className={"settings__experience__input"}
                value={experience}
                name="experience"
                onChange={this.handleExperienceChange("experience")}
              >
                <option value="" disabled>
                  experience
                </option>
                <option value={0}> 0 years</option>
                <option value={1}> >1 year</option>
                <option value={3}>1 - 3 years</option>
                <option value={5}> >5 years</option>
              </NativeSelect>
              <FormHelperText>Experience</FormHelperText>
            </FormControl>
          </form>
          <div />
        </div>
        <button onClick={() => console.log(this.state)} />
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
)(Settings);
