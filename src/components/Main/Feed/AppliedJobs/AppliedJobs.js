import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import EmployerPostModal from "../Post/EmployerPostModal/EmployerPostModal";
import "./AppliedJobs.css";
import EmployerApplicants from "../AppliedJobs/EmployerApplicants/EmployerApplicants";
import Button from "@material-ui/core/Button";
import DeleteForever from "@material-ui/icons/DeleteForever.js";
import Tooltip from "@material-ui/core/Tooltip";

class AppliedJobs extends Component {
  render() {
    //finds employers listed posts and passes down to Employer Applicants Component
    let appliedJobsFinder2 = this.props.employerPosts.map((post, i) => {
      if (post.user_id === this.props.user[0].id) {
        return <EmployerApplicants key={i} post={post} />;
      } else {
        return null;
      }
    });

    let { employerPosts, users } = this.props;

    //filters fave jobs for logged in user and puts employer_post_id's in an array
    let matchJob = this.props.favJobs
      .filter(
        person =>
          person.freelancer_id === (this.props.user[0] && this.props.user[0].id)
      )
      .map(item => item.employer_post_id);

    let appliedJobsFinder = employerPosts.map((post, index) => {
      //matching post to user who posted to display thier info and picture on posting
      let postUser = users.map((user, i) => {
        if (post.user_id === user.id && matchJob.includes(post.id)) {
          return (
            <div key={i} className="feed__mergedEmployerContainer">
              <div className="feed__employerData">
                <div className="feed__is__employer">
                  <h3>Employer</h3>
                </div>
                <Link
                  className="feed__linkToUser"
                  to={`/main/profile/${user.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="feed__employerImage">
                    <Tooltip title="Click to see Profile">
                      <img
                        className="feed__employerImage--picture"
                        src={user.profile_image}
                        alt="person"
                      />
                    </Tooltip>
                    <div className="feed__employerName">
                      <p>{`${user.first_name} ${user.last_name}`}</p>
                      <p>{user.specialty}</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="feed__employerPosting">
                <div className="feed__employerPosting__header">
                  <h3>{post.title}</h3>
                </div>
                <div className="feed__employerPosting__body">
                  <p>{post.body}</p>
                </div>
              </div>
              <div className="feed__employerPosting__rightdiv">
                <div className="feed__employerPosting__employerModalButton">
                  <EmployerPostModal
                    postUserId={post.user_id}
                    postId={post.id}
                    favJobs={this.props.favJobs}
                    pic={user.profile_image}
                    firstName={user.first_name}
                    lastName={user.last_name}
                    specialty={user.specialty}
                    title={post.title}
                    body={post.body}
                    price={post.price}
                    moment={post.moment}
                  />

                  {post.user_id === this.props.user[0].id ? (
                    <Button
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#7fc4fd"
                      }}
                      onClick={() =>
                        this.props.deleteEmployerPost(post.id).then(() => {
                          this.props.getEmployerPosts();
                        })
                      }
                    >
                      <Tooltip title="Delete Post">
                        <DeleteForever />
                      </Tooltip>
                    </Button>
                  ) : null}
                </div>
                <div className="feed__employerModalButton">
                  {matchJob.includes(post.id) && (
                    <div className="feed__applied">
                      <p>APPLIED</p>
                    </div>
                  )}
                </div>
                <div className="feed__employerPosting__rightdiv__specialty__price">
                  <p>
                    Looking For: &nbsp;
                    <strong>{post.specialty}</strong>
                  </p>
                  <hr />
                  <p>
                    Pay Rate: &nbsp; <strong>${post.price}</strong>
                  </p>
                </div>
                <div className="feed__employerPosting__moment">
                  <Moment fromNow>{post.moment}</Moment>
                </div>
              </div>
            </div>
          );
        } else {
          return null;
        }
      });

      return <div key={index}>{postUser}</div>;
    });

    //render return the merged mapped arrays
    return (
      <div className="appliedJobs__container">
        <div className="appliedJobs__topNav" />
        <div style={{ backgroundColor: "#ececec" }}>
          {this.props.user[0].role === "Freelancer" ? (
            this.props.favJobs.length !== 0 ? (
              appliedJobsFinder
            ) : (
              <h2 className="appliedJobs__noJobs">
                You have not saved any jobs!
              </h2>
            )
          ) : null}
        </div>
        {/* appliedJobsFinder2 shows employer applicants from employer applicant component */}
        {appliedJobsFinder2}
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
  {}
)(AppliedJobs);
