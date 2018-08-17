import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getEmployerPosts,
  getAppliedJobs
} from "../../../../ducks/employerReducer";
import { getUser, getUsers } from "../../../../ducks/userReducer";
import { getFaveJobs } from "../../../../ducks/freelancerReducer";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import EmployerPostModal from "../Post/EmployerPostModal/EmployerPostModal";
import "./AppliedJobs.css";
import EmployerApplicants from "../AppliedJobs/EmployerApplicants/EmployerApplicants";

class AppliedJobs extends Component {
  async componentDidMount() {
    const values = await Promise.all([
      this.props.getEmployerPosts(),
      this.props.getUsers(),
      this.props.getFaveJobs &&
        this.props.getFaveJobs(this.props.user[0] && this.props.user[0].id)
    ]);

    this.setState({ users: values[1].value.data });
  }

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
            <div key={i} className="appliedJobs__freelancerFavContainer">
              <div className="appliedJobs__userData">
                <Link
                  className="appliedJobs__linkToUser"
                  to={`/main/profile/${user.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="appliedJobs__employerImage">
                    <img
                      src={user.profile_image}
                      alt="person"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%"
                      }}
                    />
                  </div>
                  <div className="appliedJobs__employerName">
                    <p>{`${user.first_name} ${user.last_name}`}</p>
                    <p>{user.specialty}</p>
                  </div>
                </Link>
              </div>

              <div className="appliedJobs__employerPosting">
                <h3>Employer Posting</h3>
                <p>
                  Post Title:
                  {post.title}
                </p>
                <p>
                  Job Title:
                  {post.specialty}
                </p>
                <p>
                  Post Body:
                  {post.body}
                </p>
                <p>Pay: {post.price}</p>
                <div>
                  <Moment fromNow>{post.moment}</Moment>
                </div>
              </div>
              <div className="appliedJobs__employerModalButton">
                <EmployerPostModal userId={post.user_id} postId={post.id} />

                {matchJob.includes(post.id) && (
                  <div className="appliedJobs__applied">
                    <p>APPLIED</p>
                  </div>
                )}
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
        <div>{appliedJobsFinder}</div>
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
  {
    getEmployerPosts,
    getUsers,
    getUser,
    getFaveJobs,
    getAppliedJobs
  }
)(AppliedJobs);
