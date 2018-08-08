import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFreelancerPost } from '../../../../ducks/freelancerReducer';
import { addEmployerPost } from '../../../../ducks/employerReducer';
import { getUser } from '../../../../ducks/userReducer';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      specialty: '',
      price: 0
    };
  }

  onChangeHandlerFreelancer = e => {
    console.log(`${e.target.name}: `, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeHandlerEmployer = ev => {
    console.log(`${ev.target.name}: `, ev.target.value);
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  render() {
    const { title, body, specialty, price } = this.state;
    // console.log(this.props.user[0] && this.props.user[0].id);
    return (
      <div>
        {/* create freelancer posting */}
        <div className="freelancer__posting">
          <h2>Create Freelancer Posting</h2>
          <form>
            <div>
              Title:
              <input
                onChange={this.onChangeHandlerFreelancer}
                name="title"
                value={title}
                placeholder="title..."
              />
            </div>
            <div>
              Description:
              <input
                onChange={this.onChangeHandlerFreelancer}
                name="body"
                value={body}
                placeholder="description..."
              />
            </div>

            <button
              onClick={() => {
                this.props.addFreelancerPost(
                  title,
                  body,
                  this.props.user[0] && this.props.user[0].id
                );
              }}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>

        {/* create employer posting */}
        <div className="employer__posting">
          <h2>Create Employer Posting</h2>
          <form>
            <div>
              Title:
              <input
                onChange={this.onChangeHandlerEmployer}
                name="title"
                value={title}
                placeholder="title..."
              />
            </div>
            <div>
              Description:
              <input
                onChange={this.onChangeHandlerEmployer}
                name="body"
                value={body}
                placeholder="description..."
              />
            </div>
            <div>
              Specialty:
              <input
                onChange={this.onChangeHandlerEmployer}
                name="specialty"
                value={specialty}
                placeholder="Developer or Designer..."
              />
            </div>
            <div>
              Price:
              <input
                onChange={this.onChangeHandlerEmployer}
                name="price"
                value={price}
                placeholder="price..."
              />
            </div>
            <button
              onClick={() => {
                this.props.addEmployerPost(
                  title,
                  body,
                  specialty,
                  price,
                  this.props.user[0] && this.props.user[0].id
                );
              }}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    freelancerPosts: state.freelancerReducer.freelancerPosts,
    employerPosts: state.employerReducer.employerPosts,
    user: state.userReducer.user
  };
}
export default connect(
  mapStateToProps,
  { addFreelancerPost, addEmployerPost, getUser }
)(Post);
