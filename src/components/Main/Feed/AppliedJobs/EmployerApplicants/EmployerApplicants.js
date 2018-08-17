import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmployerPosts } from "../../../../../ducks/employerReducer";
import { getUser, getUsers } from "../../../../../ducks/userReducer";
import {
  getFaveJobs,
  getFreelancers
} from "../../../../../ducks/freelancerReducer";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "./EmployerApplicants.css";
import axios from "axios";

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
    let applicantList = this.state.applicants.map((applicant, i) => {
      return (
        <div key={i}>
          {" "}
          <Link
            to={`/main/profile/${applicant.freelancer_id}`}
            style={{ textDecoration: "none" }}
          >
            <p>
              {applicant.first_name}
              {"  "} {applicant.last_name}
            </p>

            <img
              src={applicant.profile_image}
              style={{ height: "50px", width: "auto" }}
            />
          </Link>
        </div>
      );
    });

    return (
      <div className="employerApplicants__employerListingContainer">
        <div className="employerApplicants__employerPosting">
          <h1>{this.props.post.title}</h1>
          <p>{this.props.post.body}</p>
          <p> {this.props.post.specialty}</p>
          <p> ${this.props.post.price}</p>
          <Moment fromNow>{this.props.post.moment}</Moment>
          <h2> My Job Applicants: </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignSelf: "center"
            }}
          >
            {applicantList}
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
