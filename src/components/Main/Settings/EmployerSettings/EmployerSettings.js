import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../../../ducks/userReducer";
import ReactS3Uploader from "react-s3-uploader";
import { updateUser } from "../../../../ducks/userReducer";
import { updateEmployer, getEmployer } from "../../../../ducks/employerReducer";

// Material UI
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/NativeSelect";
import LinearProgress from "@material-ui/core/LinearProgress";
// Material UI

import "./EmployerSettings.css";

class EmployerSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      percent: 0,
      first_name: this.props.user[0].first_name,
      last_name: this.props.user[0].last_name,
      email: this.props.user[0].email,
      profile_image: this.props.user[0].profile_image,

      company_logo: "loading...",
      city: "loading...",
      state: "loading...",
      bio: "loading...",
      heading: "loading...",
      company: "loading...",
      position: "loading..."
    };
  }
  componentDidMount() {
    this.props.getEmployer(this.props.user[0].id).then(() => {
      this.setState({
        company_logo: this.props.employer[0].company_logo,
        city: this.props.employer[0].city,
        state: this.props.employer[0].state,
        bio: this.props.employer[0].bio,
        heading: this.props.employer[0].bio,
        company: this.props.employer[0].company,
        position: this.props.employer[0].position
      });
    });
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleExperienceChange = experience => event => {
    this.setState({
      [experience]: event.target.value
    });
  };

  onPictureUpload = s3 => {
    this.setState({
      profile_image: process.env.REACT_APP_DEV_S3_URL + s3.filename
    });
  };
  onLogoPictureUpload = s3 => {
    this.setState({
      company_logo: process.env.REACT_APP_DEV_S3_URL + s3.filename
    });
  };
  onSaveHandler = () => {
    this.props.updateUser(this.state).then(() => {
      this.props.updateEmployer(this.props.user[0].id, this.state);
    });
  };

  // progress bar
  progress = percent => {
    const { completed } = this.state;
    if (completed === 100) {
      window.setTimeout(() => this.setState({ completed: 0 }), 1000);
    } else {
      this.setState({
        completed: percent
      });
    }
  };

  //end progress bar

  render() {
    let {
      last_name,
      first_name,
      email,
      profile_image,
      company_logo,
      city,
      bio,
      state,
      heading,
      company,
      position
    } = this.state;
    return (
      <div>
        <h1> Employer</h1>
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
            <span>
              <ReactS3Uploader
                signingUrl="/s3/sign"
                signingUrlMethod="GET"
                accept="image/*"
                s3path=""
                onProgress={this.progress}
                onFinish={this.onPictureUpload}
                contentDisposition="auto"
                scrubFilename={filename =>
                  filename.replace(/[^\w\d_\-.]+/gi, "")
                }
                inputRef={cmp => (this.uploadInput = cmp)}
                server={process.env.REACT_APP_DEV_HOST}
                autoUpload
              />
            </span>
          </div>
          <div className="settings__bio">
            <div>
              <TextField
                id="name"
                label="company"
                fullWidth
                className={"settings__company__input"}
                value={company}
                onChange={e => this.setState({ company: e.target.value })}
                margin="normal"
              />
            </div>
            <div>
              <TextField
                id="name"
                label="position"
                fullWidth
                className={"settings__position__input"}
                value={position}
                onChange={e => this.setState({ position: e.target.value })}
                margin="normal"
              />
            </div>
            <h4>Heading</h4>
            <TextField
              multiline={true}
              rows={1}
              rowsMax={1}
              fullWidth
              margin="normal"
              placeholder="The Neanderthal's brain was bigger than yours is."
              helperText="Write something intresting!"
              value={heading}
              onChange={e => this.setState({ heading: e.target.value })}
            />
            <h4>Bio</h4>
            <TextField
              multiline={true}
              rows={1}
              rowsMax={4}
              fullWidth
              margin="normal"
              placeholder="Mario, of Super Mario Bros. fame, appeared in the 1981 arcade game, Donkey Kong. His original name was Jumpman, but was changed to Mario to honor the Nintendo of America's landlord, Mario Segali."
              helperText="Tell everyone a little about yourself here!"
              value={bio}
              onChange={e => this.setState({ bio: e.target.value })}
            />
          </div>
          <div className="settings__info">
            <form
              className={"settings__formContainer"}
              noValidate
              autoComplete="off"
            >
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
                <TextField
                  id="name"
                  label="city"
                  fullWidth
                  className={"settings__city__input"}
                  value={city}
                  onChange={e => this.setState({ city: e.target.value })}
                  margin="normal"
                />
              </div>
              <div>
                <TextField
                  id="name"
                  label="state"
                  fullWidth
                  className={"settings__state__input"}
                  value={state}
                  onChange={e => this.setState({ state: e.target.value })}
                  margin="normal"
                />
              </div>
            </form>
            <div>
              <h3>Company Logo</h3>
              <img
                className="settings__companyImage"
                src={company_logo}
                alt="User Profile Image"
              />
              <ReactS3Uploader
                signingUrl="/s3/sign"
                signingUrlMethod="GET"
                accept="image/*"
                s3path=""
                onProgress={this.progress}
                onFinish={this.onLogoPictureUpload}
                contentDisposition="auto"
                scrubFilename={filename =>
                  filename.replace(/[^\w\d_\-.]+/gi, "")
                }
                inputRef={cmp => (this.uploadInput = cmp)}
                server={process.env.REACT_APP_DEV_HOST}
                autoUpload
              />
            </div>
            <div />

            {/* <Button
              variant="outlined"
              color="primary"
              className={"settings__saveButton"}
              onClick={this.onSaveHandler}
            >
              Save
            </Button>
            <div>
              <LinearProgress
                variant="determinate"
                value={this.state.completed}
              />
            </div> */}
          </div>
        </div>
        <div className="settings__sticky">
          <div className="settings__saveButton">
            <Button
              variant="outlined"
              color="primary"
              className={"settings__saveButton"}
              onClick={this.onSaveHandler}
            >
              Save
            </Button>
          </div>
          <div className="settings__loadingBar">
            <LinearProgress
              style={{ height: "15px" }}
              variant="determinate"
              value={this.state.completed}
            />
          </div>
        </div>
      </div>
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
  { getUser, updateUser, updateEmployer, getEmployer }
)(EmployerSettings);
