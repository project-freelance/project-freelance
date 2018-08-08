import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployerPosts } from '../../../ducks/employerReducer';
import { getFreelancerPosts } from '../../../ducks/freelancerReducer';
import { getUsers } from '../../../ducks/userReducer';
import '../Feed/Feed.css';

class Feed extends Component {
  componentDidMount() {
    this.props.getEmployerPosts();
    this.props.getFreelancerPosts();
    this.props.getUsers();
  }

  render() {
    let { employerPosts, freelancerPosts, isLoading, users } = this.props;

    freelancerPosts = isLoading ? (
      <p>Loading...</p>
    ) : (
      freelancerPosts.map((post, i) => {
        console.log(post.user_id);
        console.log(this.props.users);
        return (
          <div className="feed__freelancerPostContainer" key={i}>
            <div className="freelancerProfile">
              <div>Image</div>
            </div>
            <div className="feed__freelancerPosting">
              <h3>Freelancer Posting</h3>
              <p>Post Title: {post.title}</p>
              <p>Post Body: {post.body}</p>
              <button>More Info</button>
            </div>
          </div>
        );
      })
    );

    employerPosts = isLoading ? (
      <p>Loading...</p>
    ) : (
      employerPosts.map((post, i) => {
        return (
          <div className="feed__employerPostContainer" key={i}>
            <h3>Employer Posting</h3>
            <p>Post Title:{post.title}</p>
            <p>Post Body:{post.body}</p>
            <p>Job:{post.specialty}</p>
            <p>Pay: {post.price}</p>
            <button>More Info</button>
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
