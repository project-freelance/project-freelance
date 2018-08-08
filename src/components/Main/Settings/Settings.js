<<<<<<< HEAD
import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/userReducer";
import ReactS3Uploader from "react-s3-uploader";
// Material UI
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/NativeSelect";
=======
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../ducks/userReducer';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
>>>>>>> master
// Material UI

import './Settings.css';

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
  onPictureUpload = s3 => {
    this.setState({
      profile_image: `https://s3.us-east-2.amazonaws.com/upply-userprofile/${
        s3.filename
      }`
    });
    {
      console.log(this.state.profile_image);
    }
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
      <div className="settings__container">
        <div className="settings__profile">
          <img
            className="settings__profileImage"
            src={profile_image}
            alt="User Profile Image"
          />
          <h2>
            {first_name}
            {"  "} {last_name}
          </h2>
        </div>
        <div className="settings__bio">
          <h4>Bio</h4>
          <TextField
            multiline={true}
            rows={1}
            rowsMax={4}
            fullWidth
            margin="normal"
            placeholder="Placeholder"
            helperText="Full width!"
          />
        </div>
        <div className="settings__info">
          <form
            className={'settings__formContainer'}
            noValidate
            autoComplete="off"
          >
<<<<<<< HEAD
            <div>
              <TextField
                id="First Name"
                label="First Name"
                fullWidth
                className={"settings__firstName__input"}
                value={first_name}
                onChange={e => this.setState({ first_name: e.target.value })}
                margin="normal"
              />
            </div>
            <div>
              <TextField
                id="Last Name"
                label="Last Name"
                fullWidth
                className={"settings__lastname__input"}
                value={last_name}
                onChange={e => this.setState({ last_name: e.target.value })}
                margin="normal"
              />
            </div>
            <div>
              <TextField
                id="name"
                label="email"
                fullWidth
                className={"settings__email__input"}
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                margin="normal"
              />
            </div>
            <div>
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
            </div>
=======
            <TextField
              id="First Name"
              label="First Name"
              className={'settings__firstName__input'}
              value={first_name}
              onChange={e => this.setState({ first_name: e.target.value })}
              margin="normal"
            />
            <TextField
              id="Last Name"
              label="Last Name"
              className={'settings__lastname__input'}
              value={last_name}
              onChange={e => this.setState({ last_name: e.target.value })}
              margin="normal"
            />
            <TextField
              id="name"
              label="email"
              className={'settings__email__input'}
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              margin="normal"
            />
            <FormControl className={'form'}>
              <NativeSelect
                className={'settings__experience__input'}
                value={experience}
                name="experience"
                onChange={this.handleExperienceChange('experience')}
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
>>>>>>> master
          </form>
          <div />
          <ReactS3Uploader
            signingUrl="/s3/sign"
            signingUrlMethod="GET"
            accept="image/*"
            s3path=""
            onProgress={this.progress}
            onFinish={this.onPictureUpload}
            contentDisposition="auto"
            scrubFilename={filename => filename.replace(/[^\w\d_\-.]+/gi, "")}
            inputRef={cmp => (this.uploadInput = cmp)}
            server={process.env.REACT_APP_DEV_HOST}
            autoUpload
          />
        </div>

        {/* <button onClick={() => console.log(this.state)} /> */}
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
