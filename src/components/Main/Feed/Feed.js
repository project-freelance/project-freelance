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
import Button from "@material-ui/core/Button";

class Feed extends Component {
  constructor() {
    super();
    this.state = {
      showFreelancers: true,
      showEmployers: true
    };
    this.filterFreelancers = this.filterFreelancers.bind(this);
    this.filterEmployers = this.filterEmployers.bind(this);
    this.resetFeed = this.resetFeed.bind(this);
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

  filterFreelancers() {
    this.setState({ showFreelancers: false, showEmployers: true });
  }
  filterEmployers() {
    this.setState({ showEmployers: false, showFreelancers: true });
  }
  resetFeed() {
    this.setState({ showEmployers: true, showFreelancers: true });
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

    if (this.state.showFreelancers === false) {
      mergedArrays = employerPosts;
    } else if (this.state.showEmployers === false) {
      mergedArrays = freelancerPosts;
    } else {
      mergedArrays = preMerge(employerPosts, freelancerPosts);
    }

    console.log(mergedArrays);

    //mapping through merged freelancer and employer arrays
    let mergedStyled = mergedArrays.map((post, index) => {
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
                        <p>{`${user.first_name} ${user.last_name}`}</p>
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
                  </div>
                  <div className="feed__freelancerModalButton">
                    <div className="feed__freelancerModalButton">
                      <Button
                        style={{
                          backgroundColor: "rgb(127, 196, 253)"
                        }}
                      >
                        <FreelancerPostModal
                          userId={post.user_id}
                          postId={post.id}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            //if employer display this in return
            return (
              <div className="feed__mergedEmployerContainer">
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
                  <Button
                    style={{
                      backgroundColor: "rgb(127, 196, 253)"
                    }}
                  >
                    <EmployerPostModal userId={post.user_id} postId={post.id} />
                  </Button>
                  {matchJob.includes(post.id) && (
                    <div className="feed__applied">
                      <p>APPLIED</p>
                    </div>
                  )}
                </div>
              </div>
            );
          }
        } else {
          return null;
        }
      });
      return <div>{postUser} </div>;
    });

    //render return the merged mapped arrays
    return (
      <div className="feed__container">
        <div className="feed__topNav">
          <Button
            style={{
              // backgroundColor: "rgb(127, 196, 253)"
              color: "white"
            }}
            onClick={() => this.filterFreelancers()}
          >
            Show Employers Only
          </Button>
          <Button
            style={{
              // backgroundColor: "rgb(127, 196, 253)"
              color: "white"
            }}
            onClick={() => this.filterEmployers()}
          >
            Show Freelancers Only
          </Button>

          <Button
            style={{
              // backgroundColor: "rgb(127, 196, 253)"
              color: "white"
            }}
            onClick={() => this.resetFeed()}
          >
            Reset Feed
          </Button>
        </div>
        <div>
          <h1>In the Feed...</h1>
          <Post />
          {mergedStyled}
        </div>
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
