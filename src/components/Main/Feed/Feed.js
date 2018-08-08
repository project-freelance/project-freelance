import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmployerPosts } from "../../../ducks/employerReducer";
import { getFreelancerPosts } from "../../../ducks/freelancerReducer";
import { getUsers } from "../../../ducks/userReducer";
import "../Feed/Feed.css";

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
      console.log(this.state.users);
      console.log(this.state.users.id);
    });
  }

  render() {
    let { employerPosts, freelancerPosts, isLoading, users } = this.props;

    let userInfo = isLoading ? (
      <p>Loading...</p>
    ) : (
      users.map((user, i) => {
        //console.log(user);

        return (
          <div className="feed__userContainer" key={i}>
            <div className="feed__userProfile">
              <div className="feed__userImage">
                <img
                  src={user.profile_image}
                  alt="person"
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
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

    freelancerPosts = isLoading ? (
      <p>Loading...</p>
    ) : (
      freelancerPosts.map((post, i) => {
        console.log(post.user_id);

        let postUser = users.map((user, id) => {
          if (user.id === post.user_id) {
            return (
              <div key={user.id}>
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
                <button>More Info</button>
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
                <img
                  src={user.profile_image}
                  alt="person"
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />

                <p>{user.first_name}</p>
                <p>{user.last_name}</p>
                <p>{user.specialty}</p>
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
                <p>Post Title:{post.title}</p>
                <p>Post Body:{post.body}</p>
                <p>Job:{post.specialty}</p>
                <p>
                  Pay: {post.price} <button>More Info</button>
                </p>
              </div>
            </div>
          </div>
        );
      })
    );

    return (
      <div className="feed__container">
        <h1>In the Feed...</h1>
        {freelancerPosts}
        {employerPosts}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    employerPosts: state.employerReducer.employerPosts,
    freelancerPosts: state.freelancerReducer.freelancerPosts,
    users: state.userReducer.users
  };
}

export default connect(
  mapStateToProps,
  { getEmployerPosts, getFreelancerPosts, getUsers }
)(Feed);
