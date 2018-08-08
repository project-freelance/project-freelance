import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmployerPosts, getEmployers } from "../../../ducks/employerReducer";
import {
  getFreelancerPosts,
  getFreelancers
} from "../../../ducks/freelancerReducer";
import "../Feed/Feed.css";

class Feed extends Component {
  componentDidMount() {
    this.props.getEmployerPosts();
    this.props.getFreelancerPosts();
    this.props.getEmployers();
    this.props.getFreelancers();
  }

  render() {
    console.log(freelancers);
    let {
      employerPosts,
      freelancerPosts,
      isLoading,
      employers,
      freelancers
    } = this.props;

    freelancerPosts = isLoading ? (
      <p>Loading...</p>
    ) : (
      freelancerPosts.map((post, i) => {
        console.log(post.user_id);
        console.log(freelancers);
        return (
          <div className="feed__freelancerPostContainer" key={i}>
            <div className="freelancerProfile">
              <div>Image</div>
            </div>
            <div className="feed__freelancerPosting">
              <p>{post.title}</p>
              <p>{post.body}</p>
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
            <p>{post.title}</p>
            <p>{post.body}</p>
            <p>{post.specialty}</p>
            <p>{post.price}</p>
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
    employers: state.employerReducer.employers,
    freelancers: state.freelancerReducer.freelancers
  };
}

export default connect(
  mapStateToProps,
  { getEmployerPosts, getFreelancerPosts, getEmployers, getFreelancers }
)(Feed);
