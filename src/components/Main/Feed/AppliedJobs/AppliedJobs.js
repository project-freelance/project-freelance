import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getEmployerPosts,
  getAppliedJobs
} from "../../../../ducks/employerReducer";
import { getUser, getUsers } from "../../../../ducks/userReducer";
import {
  getFaveJobs,
  getFreelancers
} from "../../../../ducks/freelancerReducer";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import EmployerPostModal from "../Post/EmployerPostModal/EmployerPostModal";
import "./AppliedJobs.css";

class AppliedJobs extends Component {
  async componentDidMount() {
    const values = await Promise.all([
      this.props.getEmployerPosts(),
      this.props.getUsers(),
      this.props.getFaveJobs &&
        this.props.getFaveJobs(this.props.user[0] && this.props.user[0].id),
      this.props.getFreelancers()
    ]);

    this.setState({ users: values[1].value.data });
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    let { employerPosts, users } = this.props;

    //filters fave jobs for logged in user and puts employer_post_id's in an array
    let matchJob = this.props.favJobs
      .filter(
        person =>
          person.freelancer_id === (this.props.user[0] && this.props.user[0].id)
      )
      .map(item => item.employer_post_id);

    //matches employer job postings to logged in user
    let matchJobEmployer = this.props.employerPosts
      .filter(
        person =>
          person.user_id === (this.props.user[0] && this.props.user[0].id)
      )
      .map(item => item.id);

    let appliedJobsFinder = employerPosts.map((post, index) => {
      //matching post to user who posted to display user data

      // this.props
      //   .getAppliedJobs(post.id)
      //   .then(result => console.log(result.value.data));

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

      let postUser2 = users.map((user, i) => {
        if (post.user_id === user.id && matchJobEmployer.includes(post.id)) {
          // this.props
          //   .getAppliedJobs(post.id)
          //   .then(result => console.log(result.value.data));

          return (
            <div key={i} className="appliedJobs__employerListingContainer">
              <div className="appliedJobs__employerData">
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

      return (
        <div key={index}>
          {postUser}

          {postUser2}
        </div>
      );
    });

    //render return the merged mapped arrays
    return (
      <div className="appliedJobs__container">
        <div className="appliedJobs__topNav" />
        <div>{appliedJobsFinder}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    employerPosts: state.employerReducer.employerPosts,
    user: state.userReducer.user,
    users: state.userReducer.users,
    favJobs: state.freelancerReducer.favJobs,
    //appliedJobs: state.employerReducer.appliedJobs,
    freelancers: state.freelancerReducer.freelancers
  };
}
export default connect(
  mapStateToProps,
  {
    getEmployerPosts,
    getUsers,
    getUser,
    getFaveJobs,
    getAppliedJobs,
    getFreelancers
  }
)(AppliedJobs);
