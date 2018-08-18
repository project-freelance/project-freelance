import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addFaveJob,
  deleteFaveJob,
  getFaveJobs
} from "../../../../../ducks/freelancerReducer";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Moment from "react-moment";
import "../EmployerPostModal/EmployerPostModal.css";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import Info from "@material-ui/icons/Info.js";
import CancelPresentation from "@material-ui/icons/CancelPresentation.js";
import AccountCircle from "@material-ui/icons/AccountCircle.js";

class EmployerPostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    //check if logged in user has this job on their fav list
    let matchJob = this.props.favJobs
      .filter(person => person.freelancer_id === this.props.user[0].id)
      .map(item => item.employer_post_id);

    return (
      <div>
        {/* Modal Open Button */}
        <Button
          style={{
            color: "#808080"
          }}
          onClick={this.handleClickOpen}
        >
          <Tooltip title="More Info">
            <Info />
          </Tooltip>
        </Button>

        <Dialog
          className="employerPostModal__container"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          contentstyle={{
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
                      src={this.props.pic}
                      alt="employer"
                      style={{
                        width: "120px",
                        height: "120px"
                      }}
                    />
                  </div>
                  <div className="employerPostModal__buttonMoment">
                    <div className="employerPostModal__cancelButton">
                      <Tooltip title="Cancel">
                        <CancelPresentation onClick={this.handleClose} />
                      </Tooltip>
                    </div>
                    <div>
                      <Moment fromNow>{this.props.moment}</Moment>
                    </div>
                  </div>
                </div>
                <div className="employerPostModal__data">
                  <h2>{`${this.props.firstName} ${this.props.lastName}`}</h2>
                  <p>{this.props.specialty}</p>
                  <p>{this.props.title}</p>
                  <p>{this.props.body}</p>
                  <p>${this.props.price}</p>
                  <form>
                    <div className="employerPostModal__buttons">
                      <Link
                        to={`/main/profile/${this.props.postUserId}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          style={{
                            backgroundColor: "#7fc4fd"
                          }}
                        >
                          <Tooltip title="View My Profile">
                            <AccountCircle />
                          </Tooltip>
                        </Button>
                      </Link>
                      {matchJob.includes(this.props.postId) && (
                        <div className="employerPostModal__applied">
                          <Button
                            style={{
                              backgroundColor: "#008000"
                            }}
                            onClick={() => {
                              this.props
                                .deleteFaveJob(
                                  this.props.postId,
                                  this.props.user[0].id
                                )
                                .then(() => this.props.getFaveJobs());
                            }}
                          >
                            Unapply
                          </Button>
                          APPLIED
                        </div>
                      )}
                      {!matchJob.includes(this.props.postId) && (
                        <Button
                          style={{
                            backgroundColor: "#008000"
                          }}
                          onClick={() => {
                            this.props
                              .addFaveJob(
                                this.props.postId,
                                this.props.user[0].id
                              )
                              .then(() => this.props.getFaveJobs());
                          }}
                        >
                          Apply
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
    favJobs: state.freelancerReducer.favJobs
  };
}
export default connect(
  mapStateToProps,
  {
    addFaveJob,
    deleteFaveJob,
    getFaveJobs
  }
)(EmployerPostModal);
