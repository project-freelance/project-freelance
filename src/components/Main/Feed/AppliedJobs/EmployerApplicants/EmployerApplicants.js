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
import EmployerPostModal from "../../Post/EmployerPostModal/EmployerPostModal";
import "./EmployerApplicants.css";

class EmployerApplicants extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //   axios.get(`/api/getappliedfreelancers/${this.props.user_id}`).then((res)=> console.log({res}))
  }
  render() {
    console.log(this.props);
    console.log(this.props.post.user_id);
    return (
      <div className="appliedJobs__container">
        <h1>{this.props.post.title}</h1>
        <p>{this.props.post.body}</p>
        <p> {this.props.post.specialty}</p>
        <p> {this.props.post.moment}</p>
        <p> {this.props.post.user_id}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // employerPosts: state.employerReducer.employerPosts,
    // user: state.userReducer.user,
    // users: state.userReducer.users,
    // favJobs: state.freelancerReducer.favJobs,
    // freelancers: state.freelancerReducer.freelancers
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
