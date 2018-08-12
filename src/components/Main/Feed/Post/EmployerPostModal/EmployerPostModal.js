import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmployerPosts } from "../../../../../ducks/employerReducer";
import {
  addFaveJob,
  getFaveJobs
} from "../../../../../ducks/freelancerReducer";
import { getUser } from "../../../../../ducks/userReducer";
import { getUsers } from "../../../../../ducks/userReducer";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Moment from "react-moment";
import "../EmployerPostModal/EmployerPostModal.css";
import { Link } from "react-router-dom";

class EmployerPostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      favJobs: []
    };
  }

  componentDidMount() {
    this.props.getFaveJobs &&
      this.props
        .getFaveJobs(this.props.user[0] && this.props.user[0].id)
        .then(() => this.setState({ favJobs: this.props.favJobs }));
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSpecialtyChange = specialty => event => {
    this.setState({
      [specialty]: event.target.value
    });
  };

  // refreshFavJobs = () => {
  //   this.props.getFaveJobs(this.props.user[0].id);
  // };

  render() {
    const userIdFromPost = this.props && this.props.userId;
    const postId = this.props && this.props.postId;
    const freelancer_id = this.props && this.props.freelancer_id;

    let matchUser = this.props.users.find(user => user.id === userIdFromPost);
    //console.log(matchUser);

    let matchPost = this.props.employerPosts.find(post => post.id === postId);
    // console.log(matchUser);
    // console.log(matchPost);
    // console.log(this.props);

    let matchJob = this.props.favJobs
      .filter(person => person.freelancer_id === this.props.user[0].id)
      .map(item => item.employer_post_id);
    console.log(matchJob);

    // let jobCheck = this.props.getFaveJobs.find(
    //   job => job.employer_post_id === freelancer_id
    // );
    // console.log(jobCheck);

    return (
      <div>
        {/* Modal Open Button */}
        <Button onClick={this.handleClickOpen}>More Info</Button>

        <Dialog
          className="employerPostModal__container"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          contentStyle={{
            width: "70vh",
            maxWidth: "100%",
            height: "70vw",
            padding: "30px"
          }}
        >
          <DialogContent>
            <div>
              <div className="employerPostModal__content">
                <div className="employerPostModal__picCancel">
                  <div>
                    <img
                      src={matchUser && matchUser.profile_image}
                      alt="person"
                      style={{
                        width: "120px",
                        height: "120px"
                      }}
                    />
                  </div>
                  <div className="employerPostModal__buttonMoment">
                    <div>
                      <Button
                        style={{
                          backgroundColor: "#FF4500"
                        }}
                        onClick={this.handleClose}
                      >
                        Cancel
                      </Button>
                    </div>
                    <div>
                      <Moment fromNow>{matchPost && matchPost.moment}</Moment>
                    </div>
                  </div>
                </div>
                <div className="employerPostModal__data">
                  <h2>
                    {matchUser &&
                      matchUser.first_name + " " + matchUser.last_name}
                  </h2>
                  <p>{matchUser && matchUser.specialty}</p>
                  <p>{matchPost && matchPost.title}</p>
                  <p>{matchPost && matchPost.body}</p>
                  <p>${matchPost && matchPost.price}</p>

                  <form>
                    <div className="employerPostModal__buttons">
                      <Link
                        to={`/main/profile/${matchUser && matchUser.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          style={{
                            backgroundColor: "#0000FF"
                          }}
                        >
                          View My Profile
                        </Button>
                      </Link>
                      {matchJob.includes(matchPost.id) && (
                        // == this.props.user[0].id
                        <div className="employerPostModal__applied">
                          APPLIED
                        </div>
                      )}
                      {!matchJob.includes(matchPost.id) && (
                        <Button
                          style={{
                            backgroundColor: "#008000"
                          }}
                          onClick={() => {
                            this.props
                              .addFaveJob(matchPost.id, this.props.user[0].id)
                              .then(console.log(this.props.favJobs));
                            // .then(
                            //   this.props.getFaveJobs(this.props.user[0]).id
                            // );

                            //.then(this.refreshFavJobs());
                          }}
                        >
                          Apply to this Job
                        </Button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    employerPosts: state.employerReducer.employerPosts,
    user: state.userReducer.user,
    users: state.userReducer.users,
    favJobs: state.freelancerReducer.favJobs
  };
}
export default connect(
  mapStateToProps,
  {
    getEmployerPosts,
    getUser,
    getUsers,
    addFaveJob,
    getFaveJobs
  }
)(EmployerPostModal);
