import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmployerPosts } from "../../../ducks/employerReducer";
import { getFreelancerPosts } from "../../../ducks/freelancerReducer";
import { getUser, getUsers } from "../../../ducks/userReducer";
import { getFaveJobs } from "../../../ducks/freelancerReducer";
import "../Feed/Feed.css";
import Post from "../Feed/Post/Post";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import FreelancerPostModal from "./Post/FreelancerPostModal/FreelancerPostModal";
import EmployerPostModal from "./Post/EmployerPostModal/EmployerPostModal";

class Feed extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getEmployerPosts();
    this.props.getFreelancerPosts();
    this.props.getUsers().then(result => {
      this.setState({
        users: result.value.data
      });
    });
    this.props.getFaveJobs &&
      this.props.getFaveJobs(this.props.user[0] && this.props.user[0].id);
  }

  render() {
    //getting logged in user's saved jobs
    let matchJob = this.props.favJobs
      .filter(person => person.freelancer_id === this.props.user[0].id)
      .map(item => item.employer_post_id);

    let { employerPosts, freelancerPosts, isLoading, users } = this.props;

    //function to merge arrays and sort by moment
    function preMerge(arr1, arr2) {
      let result = [...arr1, ...arr2];
      return result.sort(function(a, b) {
        return a.moment < b.moment ? 1 : b.moment < a.moment ? -1 : 0;
      });
    }

    //invoking the merge function passing in our arrays
    let mergedArrays = preMerge(employerPosts, freelancerPosts);

    //mapping through merged freelancer and employer arrays
    let mergedDiv = mergedArrays.map((post, index) => {
      //matching post to user who posted to display user data
      let postUser = users.map((user, i) => {
        if (post.user_id == user.id) {
          //if freelancer display this in return
          if (user.role === "Freelancer") {
            return (
              <div key={index}>
                <div className="feed__mergedFreelancerContainer">
                  <div className="feed__freelancerUser">
                    <Link
                      className="feed__linkToUser"
                      to={`/main/profile/${user.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="feed__userImage">
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
                      <div className="feed__userName">
                        {user.first_name}
                        {user.last_name}
                        {user.specialty}
                      </div>
                    </Link>
                  </div>
                  <div className="feed__freelancerPosting">
                    <h3>Freelancer Posting</h3>
                    <p>Post Title: {post.title}</p>
                    <p>Post Body: {post.body}</p>
                    <div>
                      <Moment fromNow>{post.moment}</Moment>
                    </div>

                    <button>
                      <FreelancerPostModal
                        userId={post.user_id}
                        postId={post.id}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          } else {
            //if employer display this in return
            return (
              <div className="feed__mergedEmployerContainer">
                <div className="feed__employerPosting">
                  <Link
                    className="feed__linkToUser"
                    to={`/main/profile/${user.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={user.profile_image}
                      alt="person"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%"
                      }}
                    />

                    <p>
                      {user.first_name}
                      {user.last_name}
                    </p>
                  </Link>
                </div>
                <p>{user.specialty}</p>
                <p>{post.title}</p>
                <p>{post.moment}</p>

                <div>
                  <h3>Employer Posting</h3>
                  {matchJob.includes(post.id) && (
                    <div className="feed__applied">
                      <p>APPLIED</p>
                    </div>
                  )}
                  <p>
                    Post Title:
                    {post.title}
                  </p>
                  <p>
                    Post Body:
                    {post.body}
                  </p>
                  <p>
                    Job:
                    {post.specialty}
                  </p>
                  <div>
                    <Moment fromNow>{post.moment}</Moment>
                  </div>
                  <p>
                    Pay: {post.price}
                    <button>
                      <EmployerPostModal
                        userId={post.user_id}
                        postId={post.id}
                      />
                    </button>
                  </p>
                </div>
              </div>
            );
          }
        }
      });
      return <div>{postUser} </div>;
    });

    //render return the merged mapped arrays
    return (
      <div className="feed__container">
        <h1>In the Feed...</h1>
        <Post />
        {mergedDiv}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    employerPosts: state.employerReducer.employerPosts,
    freelancerPosts: state.freelancerReducer.freelancerPosts,
    user: state.userReducer.user,
    users: state.userReducer.users,
    favJobs: state.freelancerReducer.favJobs
  };
}

export default connect(
  mapStateToProps,
  { getEmployerPosts, getFreelancerPosts, getUsers, getUser, getFaveJobs }
)(Feed);
