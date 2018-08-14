import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmployerPosts } from "../../../../ducks/employerReducer";
import { getUser, getUsers } from "../../../../ducks/userReducer";
import { getFaveJobs } from "../../../../ducks/freelancerReducer";
import { Link } from "react-router-dom";
import Feed from "../Feed";
import Post from "../Post/Post";
import Moment from "react-moment";
import Button from "@material-ui/core/Button";
import EmployerPostModal from "../Post/EmployerPostModal/EmployerPostModal";

class AppliedJobs extends Component {
  constructor(props) {
    super(props);
  }

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
    console.log(this.props);
    let { employerPosts, isLoading, users } = this.props;

    let matchJob = this.props.favJobs
      .filter(person => person.freelancer_id === this.props.user[0].id)
      .map(item => item.employer_post_id);

    let appliedJobs = employerPosts.map((post, index) => {
      //matching post to user who posted to display user data
      let postUser = users.map((user, i) => {
        if (post.user_id == user.id && matchJob.includes(post.id)) {
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
              color: "white"
            }}
            onClick={() => this.filterFreelancers()}
          >
            Show Employers Only
          </Button>
          <Button
            style={{
              color: "white"
            }}
            onClick={() => this.filterEmployers()}
          >
            Show Freelancers Only
          </Button>

          <Button
            style={{
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
          {appliedJobs}
        </div>
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
