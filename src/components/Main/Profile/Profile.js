import React, { Component } from "react";
import { connect } from "react-redux";
import { getFreelancer } from "../../../ducks/freelancerReducer";
import AddReview from "./Reviews/AddReview/AddReview";
class Profile extends Component {
  componentDidMount() {
    this.props.getFreelancer();
    // .then(() => {
    //   console.log(this.props);
    // });
  }

  render() {
    console.log(this.props);
    console.log(this.props.freelancer);
    // console.log(this.props.freelancer[0] && this.props.freelancer[0].city);
    // console.log(
    //   this.props.freelancer[0] && this.props.freelancer[0].first_name
    // );
    console.log(this.props.freelancer[0]);
    let { freelancer } = this.props;
    return (
      <div>
        <div>
          <h1>Freelancer Profile</h1>
          {/* <div>{this.props.freelancer.first_name}</div> */}
          <div>
            {this.props.freelancer[0] && this.props.freelancer[0].first_name}
          </div>
          <img src={freelancer.image_url} />
          <div>City {freelancer.city}</div>
          <div>Avg Rating (props...need to build)</div>
          <div>Specialty {freelancer.specialty}</div>
          <div>Skills {freelancer.skills}</div>
          <div>Experience {freelancer.experience}</div>
          <div>Bio {freelancer.bio}</div>
          <div>Portfolio {freelancer.image_url}</div>
          <button>Contact Me (...email address in users table)</button>
          <button>Add Review/Rating</button>
        </div>
        <AddReview />
      </div>
    );
  }
}

const mapStateToProps = ({ freelancerReducer }) => ({ ...freelancerReducer });

export default connect(
  mapStateToProps,
  { getFreelancer }
)(Profile);
