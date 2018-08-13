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
    this.state = {
      users: []
    };
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
    let matchJob = this.props.favJobs
      .filter(person => person.freelancer_id === this.props.user[0].id)
      .map(item => item.employer_post_id);

    let { employerPosts, freelancerPosts, isLoading, users } = this.props;

    let userInfo = isLoading ? (
      <p>Loading...</p>
    ) : (
      users.map((user, i) => {
        return (
          <div className="feed__userContainer" key={i}>
            <div className="feed__userProfile">
              <div className="feed__userImage">
                <img
                  src={user.profile_image}
                  alt="person"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%"
                  }}
                />
              </div>
              <div className="feed__userData">
                <p>{user.first_name}</p>
                <p>{user.last_name}</p>
                <p>{user.specialty}</p>
              </div>
            </div>
          </div>
        );
      })
    );

    // console.log(employerPosts);
    // console.log(freelancerPosts);
    // console.log(preMerge(employerPosts, freelancerPosts));

    //function to merge arrays and sort by moment
    function preMerge(arr1, arr2) {
      let result = [...arr1, ...arr2];
      return result.sort(function(a, b) {
        return a.moment > b.moment ? 1 : b.moment > a.moment ? -1 : 0;
      });
    }

    //calling merge function

    let mergedArrays = preMerge(employerPosts, freelancerPosts);

    console.log(mergedArrays);
    console.log(users);
    console.log(mergedDiv);

    let mergedDiv = mergedArrays.map((post, i) => {
      return (
        <div className="feed__freelancerPostContainer">
          <p>{post.title}</p>
          <p>{post.moment}</p>
        </div>
      );
    });

    //let mergedAndMapped = mergedArrays.map();

    freelancerPosts = isLoading ? (
      <p>Loading...</p>
    ) : (
      freelancerPosts.map((post, i) => {
        let postUser = users.map((user, id) => {
          if (user.id === post.user_id) {
            return (
              <div key={user.id}>
                <Link
                  className="feed__linkToUser"
                  to={`/main/profile/${user.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div>
                    <img
                      src={user.profile_image}
                      alt="person"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%"
                      }}
                    />
                  </div>
                  <div>
                    <p>
                      {user.first_name}
                      {user.last_name}
                    </p>

                    <p>{user.specialty}</p>
                  </div>
                </Link>
              </div>
            );
          } else {
            null;
          }
        });

        return (
          <div className="feed__freelancerPostContainer" key={i}>
            <div className="freelancerProfile" />
            <div className="feed__freelancerPosting">
              <div>{postUser}</div>
              <div>
                <h3>Freelancer Posting</h3>
                <p>Post Title: {post.title}</p>
                <p>Post Body: {post.body}</p>

                <div>
                  <Moment fromNow>{post.moment}</Moment>
                </div>

                <button>
                  <FreelancerPostModal userId={post.user_id} postId={post.id} />
                </button>
              </div>
            </div>
          </div>
        );
      })
    );

    employerPosts = isLoading ? (
      <p>Loading...</p>
    ) : (
      employerPosts.map((post, i) => {
        let postUser = users.map((user, id) => {
          if (user.id === post.user_id) {
            return (
              <div key={user.id}>
                <Link
                  className="feed__linkToUser"
                  to={`/main/profile/${user.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={user.profile_image}
                    alt="person"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%"
                    }}
                  />

                  <p>{user.first_name}</p>
                  <p>{user.last_name}</p>
                  <p>{user.specialty}</p>
                </Link>
              </div>
            );
          } else {
            null;
          }
        });
        return (
          <div className="feed__employerPostContainer" key={i}>
            <div className="feed__employerPosting">
              <div>{postUser}</div>
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
                    <EmployerPostModal userId={post.user_id} postId={post.id} />
                  </button>
                </p>
              </div>
            </div>
          </div>
        );
      })
    );

    // function preMerge(arr1, arr2) {
    //   let result = [...arr1, ...arr2];
    //   return result.sort(function(a, b) {
    //     return a.moment > b.moment ? 1 : b.moment > a.moment ? -1 : 0;
    //   });
    // }

    // console.log(preMerge(employerPosts, freelancerPosts));

    return (
      <div className="feed__container">
        <h1>In the Feed...</h1>

        <button>
          <Post />
        </button>

        {freelancerPosts}
        {employerPosts}
        {/* {freelancerPosts}
        {employerPosts} */}
        <h1>divider</h1>
        {/* {preMerge(employerPosts, freelancerPosts)} */}

        {/* {mergedArrays} */}
        {/* {mergeTwo(employerPosts, freelancerPosts)} */}
        {/* {mergedArrays} */}
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
