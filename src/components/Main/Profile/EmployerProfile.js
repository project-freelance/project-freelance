import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmployer } from "../../../ducks/employerReducer";
import AddReview from "./Reviews/AddReview/AddReview";
import { getUser } from "../../../ducks/userReducer";
class EmployerProfile extends Component {
  componentDidMount() {
    // this.props.getEmployer(this.props.match.params.id);
    // this.props.getUser();
  }

  render() {
    let { freelancer } = this.props;
    console.log(this.props);
    return (
      <div>
        <div>
          <h1>Employer Profile</h1>
          <p>hi from employer</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ employerReducer, userReducer }) => ({
  ...employerReducer,
  ...userReducer
});

export default connect(
  mapStateToProps,
  { getEmployer, getUser }
)(EmployerProfile);
