import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployerPosts } from '../../../../../ducks/employerReducer';
import { getUser, getUsers } from '../../../../../ducks/userReducer';
import {
  getFaveJobs,
  getFreelancers
} from '../../../../../ducks/freelancerReducer';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './EmployerApplicants.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import DeleteForever from '@material-ui/icons/DeleteForever.js';
import Tooltip from '@material-ui/core/Tooltip';

class EmployerApplicants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicants: []
    };
  }
  componentDidMount() {
    axios
      .get(`/api/employer/appliedJobs/freelancers/${this.props.post.id}`)
      .then(response => this.setState({ applicants: response.data }));
  }
  render() {
    console.log(this.props);
    let applicantList = this.state.applicants.map((applicant, i) => {
      return (
        <div key={i}>
          <Link
            to={`/main/profile/${applicant.freelancer_id}`}
            style={{ textDecoration: 'none' }}
          >
            <div className="employerApplicants__applicantContainer">
              <p>
                {applicant.first_name} {'  '}
                {applicant.last_name}
              </p>

              <img
                src={applicant.profile_image}
                style={{ height: '50px', width: 'auto' }}
              />
              <div className="overlay">
                <div className="employerApplicants__text">
                  <p>
                    {applicant.first_name} {'  '}
                    {applicant.last_name}
                  </p>
                  <p className="employerApplicants__viewProfile">
                    View My Profile
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    });

    return (
      <div className="feed__mergedEmployerContainer">
        <div className="feed__employerData">
          <div className="feed__is__employer">
            <h3>Employer</h3>
          </div>
        </div>

        <div className="feed__employerPosting">
          <div className="feed__employerPosting__header">
            <h3>
              {/* Employer Posting: &nbsp; */}
              {this.props.post.title}
            </h3>
          </div>
          <div className="feed__employerPosting__body">
            <p>{this.props.post.body}</p>
          </div>
          <div className="employerApplicants__list__header">
            <h2> My Job Applicants: </h2>

            <div className="employerApplicants__list">{applicantList}</div>
          </div>
        </div>

        <div className="feed__employerPosting__rightdiv">
          <div className="feed__employerPosting__employerModalButton">
            {this.props.post.user_id === this.props.user[0].id ? (
              <Button
                style={{
                  width: '20px',
                  height: '20px',
                  color: '#7fc4fd'
                }}
                onClick={() =>
                  this.props.deleteEmployerPost(this.post.id).then(() => {
                    this.props.getEmployerPosts();
                  })
                }
              >
                <Tooltip title="Delete Post">
                  <DeleteForever />
                </Tooltip>
              </Button>
            ) : null}
          </div>

          <div className="feed__employerPosting__rightdiv__specialty__price">
            <p>
              Looking For: &nbsp;
              <strong>{this.props.post.specialty}</strong>
            </p>
            <hr />
            <p>
              Pay Rate: &nbsp; <strong>${this.props.post.price}</strong>
            </p>
          </div>
          <div className="feed__employerPosting__moment">
            <Moment fromNow>{this.props.post.moment}</Moment>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}
export default connect(
  mapStateToProps,
  {
    getEmployerPosts,
    getUsers,
    getUser,
    getFaveJobs,
    getFreelancers
  }
)(EmployerApplicants);
