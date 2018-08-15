import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmployerPosts } from "../../../../ducks/employerReducer";
import { getUser, getUsers } from "../../../../ducks/userReducer";
import { getFaveJobs } from "../../../../ducks/freelancerReducer";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Button from "@material-ui/core/Button";
import EmployerPostModal from "../Post/EmployerPostModal/EmployerPostModal";
import "./AppliedJobs.css";

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
    let { employerPosts, users } = this.props;

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

    let appliedJobs = employerPosts.map((post, index) => {
      //matching post to user who posted to display user data
      let postUser = users.map((user, i) => {
        if (post.user_id === user.id && matchJob.includes(post.id)) {
          return (
            <div key={i} className="feed__mergedEmployerContainer">
              <div className="feed__employerData">
                <Link
                  className="feed__linkToUser"
                  to={`/main/profile/${user.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="feed__employerImage">
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
                  <div className="feed__employerName">
                    <p>{`${user.first_name} ${user.last_name}`}</p>
                    <p>{user.specialty}</p>
                  </div>
                </Link>
              </div>

              <div className="feed__employerPosting">
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
              <div className="feed__employerModalButton">
                <EmployerPostModal userId={post.user_id} postId={post.id} />

                {matchJob.includes(post.id) && (
                  <div className="feed__applied">
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
          return (
            <div key={i} className="feed__mergedEmployerContainer">
              <div className="feed__employerData">
                <Link
                  className="feed__linkToUser"
                  to={`/main/profile/${user.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="feed__employerImage">
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
                  <div className="feed__employerName">
                    <p>{`${user.first_name} ${user.last_name}`}</p>
                    <p>{user.specialty}</p>
                  </div>
                </Link>
              </div>

              <div className="feed__employerPosting">
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
              <div className="feed__employerModalButton">
                <EmployerPostModal userId={post.user_id} postId={post.id} />

                {matchJob.includes(post.id) && (
                  <div className="feed__applied">
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
        <div>{appliedJobs}</div>
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
  { getEmployerPosts, getUsers, getUser, getFaveJobs }
)(AppliedJobs);
