import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFreelancerPost } from '../../../../ducks/freelancerReducer';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      id: 0
    };
  }

  onChangeHandler = e => {
    console.log(`${e.target.name}: `, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { title, body } = this.state;
    return (
      <div>
        <div>
          <h2>Create Freelancer Posting</h2>
        </div>
        <form>
          <div>
            Post Title:
            <input
              onChange={this.onChangeHandler}
              name="title"
              value={title}
              placeholder="title..."
            />
          </div>
          <div>
            Post Description:
            <input
              onChange={this.onChangeHandler}
              name="description"
              value={body}
              placeholder="description..."
            />
          </div>
          <button>Cancel</button>
          <button
            onClick={() => {
              this.props.addFreelancerPost(title, body);
            }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    freelancerPosts: state.freelancerReducer.freelancerPosts
  };
}
export default connect(
  mapStateToProps,
  { addFreelancerPost }
)(Post);
