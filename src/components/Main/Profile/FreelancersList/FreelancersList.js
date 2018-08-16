import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllFreelancerInfo } from "../../../../ducks/freelancerReducer";
import "./FreelancersList.css";

class FreelancersList extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getAllFreelancerInfo();
  }

  render() {
    console.log(this.props);
    let freelancers = this.props.allFreelancers.map(freelancer => {
      return (
        <div key={freelancer.id}>
          <div className="freelancersList__block">
            <img
              className="freelancersList__img"
              src={freelancer.profile_image}
            />
            <div className="freelancersList__name">
              {freelancer.first_name} {freelancer.last_name}
            </div>
            <div>{freelancer.specialty}</div>
            <div>{freelancer.heading}</div>
            <div>{freelancer.skill}</div>
            <div>{freelancer.city}</div>
            {/* <div className="howdy">howdy</div> */}
          </div>
        </div>
      );
    });
    return (
      <div>
        <h1>Freelancers In App</h1>
        {freelancers}
      </div>
    );
  }
}

const mapStateToProps = ({ freelancerReducer }) => ({ ...freelancerReducer });

export default connect(
  mapStateToProps,
  { getAllFreelancerInfo }
)(FreelancersList);
