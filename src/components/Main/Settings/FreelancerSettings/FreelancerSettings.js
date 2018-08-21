import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../../../ducks/userReducer";
import ReactS3Uploader from "react-s3-uploader";
import { updateUser } from "../../../../ducks/userReducer";
import {
  getFreelancer,
  updateFreelancer
} from "../../../../ducks/freelancerReducer";
import {
  getPortfolio,
  updatePortfolio,
  deleteFreelancerPost
} from "../../../../ducks/portfolioReducer";

// Material UI
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/NativeSelect";
import LinearProgress from "@material-ui/core/LinearProgress";
// Material UI

import "./FreelancerSettings.css";

class FreelancerSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: this.props.user[0].first_name,
      last_name: this.props.user[0].last_name,
      email: this.props.user[0].email,
      profile_image: this.props.user[0].profile_image,

      experience: "loading...",
      city: "loading...",
      state: "loading...",
      bio: "loading...",
      heading: "loading...",
      skills: "loading...",

      image_url1:
        "https://s3.us-east-1.amazonaws.com/freelancer-userprofilebucket/62991d50-a76e-457c-ba9c-bd42af91d335_pug.jpeg",
      image_url2:
        "https://s3.us-east-1.amazonaws.com/freelancer-userprofilebucket/d9fe48ac-c9f3-4c6a-844d-85715c4eb23c_Pug1.jpeg",
      image_url3:
        "https://s3.us-east-1.amazonaws.com/freelancer-userprofilebucket/64bea7de-f8d0-414d-a110-950584f7b3c7_Pug3.jpg",
      link1: this.props.portfolio[0].link1,
      link2: this.props.portfolio[0].link2,
      link3: this.props.portfolio[0].link3,

      completed: 0,
      percent: 0
    };
  }
  componentDidMount() {
    this.props.getFreelancer(this.props.user[0].id).then(
      () =>
        this.setState({
          experience: this.props.freelancer[0].experience,
          city: this.props.freelancer[0].city,
          state: this.props.freelancer[0].state,
          bio: this.props.freelancer[0].bio,
          heading: this.props.freelancer[0].heading,
          skills: this.props.freelancer[0].skills
        }),
      this.props.getPortfolio(this.props.user[0].id).then(() => {
        this.setState({
          image_url1: this.props.portfolio[0].image_url1,
          image_url2: this.props.portfolio[0].image_url2,
          image_url3: this.props.portfolio[0].image_url3,
          link1: this.props.portfolio[0].link1,
          link2: this.props.portfolio[0].link2,
          link3: this.props.portfolio[0].link3
        });
      })
    );
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
  onPortfolio1Upload = s3 => {
    this.setState({
      image_url1: process.env.REACT_APP_DEV_S3_URL + s3.filename
    });
  };
  onPortfolio2Upload = s3 => {
    this.setState({
      image_url2: process.env.REACT_APP_DEV_S3_URL + s3.filename
    });
  };
  onPortfolio3Upload = s3 => {
    this.setState({
      image_url3: process.env.REACT_APP_DEV_S3_URL + s3.filename
    });
  };

  onSaveHandler = () => {
    this.props.updateUser(this.state).then(() => {
      this.props.updateFreelancer(this.props.user[0].id, this.state);
      this.props.updatePortfolio(this.props.user[0].id, this.state);
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
  //end progress bar

  render() {
    let {
      last_name,
      first_name,
      email,
      profile_image,
      experience,
      city,
      bio,
      state,
      heading,
      skills,
      link1,
      link2,
      link3,
      image_url1,
      image_url2,
      image_url3
    } = this.state;
    return (
      <div>
        <h1>Freelancer</h1>
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
            <h4>Profile Heading</h4>
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
              <div>
                <TextField
                  id="skills"
                  label="skills"
                  fullWidth
                  className={"settings__skills__input"}
                  value={skills}
                  onChange={e => this.setState({ skills: e.target.value })}
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
            </form>
            <div />
          </div>
        </div>
        <h2 style={{ marginTop: "-1vh", alignContent: "left" }}>
          Your portfolio
        </h2>
        <div className="settings__portfolio">
          <div className="settings__portfolio__contianer">
            <TextField
              id="link1"
              label="link1"
              fullWidth
              className={"settings__link__input"}
              value={link1}
              onChange={e => this.setState({ link1: e.target.value })}
              margin="normal"
            />
            <img
              className="settings__portfolioImage"
              src={image_url1}
              alt="Porfolio image one"
            />{" "}
            <ReactS3Uploader
              signingUrl="/s3/sign"
              signingUrlMethod="GET"
              accept="image/*"
              s3path=""
              onProgress={this.progress}
              onFinish={this.onPortfolio1Upload}
              contentDisposition="auto"
              scrubFilename={filename => filename.replace(/[^\w\d_\-.]+/gi, "")}
              inputRef={cmp => (this.uploadInput = cmp)}
              server={process.env.REACT_APP_DEV_HOST}
              autoUpload
            />
          </div>
          <div className="settings__portfolio__contianer">
            <TextField
              id="name"
              label="link2"
              fullWidth
              className={"settings__link__input"}
              value={link2}
              onChange={e => this.setState({ link2: e.target.value })}
              margin="normal"
            />
            <img
              className="settings__portfolioImage"
              src={image_url2}
              alt="portfolio image two"
            />{" "}
            <ReactS3Uploader
              signingUrl="/s3/sign"
              signingUrlMethod="GET"
              accept="image/*"
              s3path=""
              onProgress={this.progress}
              onFinish={this.onPortfolio2Upload}
              contentDisposition="auto"
              scrubFilename={filename => filename.replace(/[^\w\d_\-.]+/gi, "")}
              inputRef={cmp => (this.uploadInput = cmp)}
              server={process.env.REACT_APP_DEV_HOST}
              autoUpload
            />
          </div>
          <div className="settings__portfolio__contianer">
            <TextField
              id="name"
              label="link3"
              fullWidth
              className={"settings__link3__input"}
              value={link3}
              onChange={e => this.setState({ link3: e.target.value })}
              margin="normal"
            />
            <img
              className="settings__portfolioImage"
              src={image_url3}
              alt="portfolio image 3"
            />
            <ReactS3Uploader
              signingUrl="/s3/sign"
              signingUrlMethod="GET"
              accept="image/*"
              s3path=""
              onProgress={this.progress}
              onFinish={this.onPortfolio3Upload}
              contentDisposition="auto"
              scrubFilename={filename => filename.replace(/[^\w\d_\-.]+/gi, "")}
              inputRef={cmp => (this.uploadInput = cmp)}
              server={process.env.REACT_APP_DEV_HOST}
              autoUpload
            />
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
    freelancer: state.freelancerReducer.freelancer,
    portfolio: state.portfolioReducer.portfolio
  };
}
export default connect(
  mapStateToProps,
  {
    getUser,
    updateUser,
    updateFreelancer,
    getFreelancer,
    getPortfolio,
    updatePortfolio,
    deleteFreelancerPost
  }
)(FreelancerSettings);
