import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, getUsers } from '../../../../ducks/userReducer';
import { getFaveJobs } from '../../../../ducks/freelancerReducer';

class AppliedJobs extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsers().then(result => {
      this.setState({
        users: result.value.data
      });
    });
  }
  render() {
    console.log(this.props);
    return <div>Test</div>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    users: state.userReducer.users,
    favJobs: state.freelancerReducer.favJobs
  };
}
export default connect(
  mapStateToProps,
  { getUsers, getUser, getFaveJobs }
)(AppliedJobs);
