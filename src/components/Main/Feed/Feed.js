import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmployerPosts } from "../../../ducks/employerReducer";
import { getFreelancerPosts } from "../../../ducks/freelancerReducer";
import { post } from "../../../../node_modules/request";
import "../Feed/Feed.css";

class Feed extends Component {
  componentDidMount() {
    this.props.getEmployerPosts();
    this.props.getFreelancerPosts();
  }

  render() {
    console.log(this.props);

    let { employerPosts, freelancerPosts, isLoading } = this.props;
    console.log(freelancerPosts);

    freelancerPosts = isLoading ? (
      <p>Loading...</p>
    ) : (
      freelancerPosts.map((post, i) => {
        console.log(post);
        return (
          <div className="feed__freelancerPostContainer" key={i}>
            <p>{post.title}</p>
            <p>{post.body}</p>
          </div>
        );
      })
    );

    employerPosts = isLoading ? (
      <p>Loading...</p>
    ) : (
      employerPosts.map((post, i) => {
        console.log(post);
        return (
          <div className="feed__employerPostContainer" key={i}>
            <p>{post.title}</p>
            <p>{post.body}</p>
            <p>{post.specialty}</p>
            <p>{post.price}</p>
          </div>
        );
      })
    );

    return (
      <div>
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
    freelancerPosts: state.freelancerReducer.freelancerPosts
  };
}

export default connect(
  mapStateToProps,
  { getEmployerPosts, getFreelancerPosts }
)(Feed);
