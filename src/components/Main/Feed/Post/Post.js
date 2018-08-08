import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFreelancerPost } from '../../../../ducks/freelancerReducer';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }
  render() {
    return (
      <div>
        <div>Create Freelancer Posting</div>
        <div>Post Title:</div>
        <div>Post Description:</div>
        <button>Cancel</button>
        <button>Submit</button>
      </div>
    );
  }
}

export default Post;
