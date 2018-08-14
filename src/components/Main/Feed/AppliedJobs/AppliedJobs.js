import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployerPosts } from '../../../../ducks/employerReducer';
import { getFreelancerPosts } from '../../../../ducks/freelancerReducer';
import { getUser, getUsers } from '../../../../ducks/userReducer';
import { getFaveJobs } from '../../../../ducks/freelancerReducer';
import Feed from '../Feed';

class AppliedJobs extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEmployerPosts();
    // this.props.getFreelancerPosts();
    this.props.getUsers().then(result => {
      this.setState({
        users: result.value.data
      });
    });
    this.props.getFaveJobs &&
      this.props.getFaveJobs(this.props.user[0] && this.props.user[0].id);
  }
  render() {
    // let freelancerAppliedJobs = this.props.favJobs.map(job => {
    //   return <div key={job.id} />;
    // });

    let freelancerAppliedJobs = this.props.favJobs.map(job => {
      if (this.props.favJobs.id === this.props.employerPosts.id) {
        return <div>{this.props.employerPosts}</div>;
      } else {
        return <div>Currently no applied jobs.</div>;
      }
    });

    // let this.props.favJobs.id === this.props.employerPosts.id ? {}

    console.log(freelancerAppliedJobs);
    console.log(this.props);
    console.log(this.props.user[0]);
    console.log(this.props.favJobs);
    console.log(this.props.employerPosts);
    console.log(freelancerAppliedJobs);

    // console.log(matchJob);

    return (
      <div>
        <div className="">Test</div>
        {/* <div className="">{freelancerAppliedJobs}</div> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    employerPosts: state.employerReducer.employerPosts,
    user: state.userReducer.user,
    users: state.userReducer.users,
    favJobs: state.freelancerReducer.favJobs
  };
}
export default connect(
  mapStateToProps,
  { getEmployerPosts, getUsers, getUser, getFaveJobs }
)(AppliedJobs);
