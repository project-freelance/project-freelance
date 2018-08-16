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
        <div key={freelancer.id} className="freelancersList__wrapper">
          {/* <div className="freelancersList__block">
            <img
              className="freelancersList__img"
              src={freelancer.profile_image}
            />
            <div className="freelancersList__name">
              {freelancer.first_name} {freelancer.last_name}
            </div> */}
          {/* <div>{freelancer.specialty}</div> */}
          {/* <div>{freelancer.heading}</div> */}
          {/* <div>{freelancer.skill}</div> */}
          {/* <div>{freelancer.city}</div> */}
          {/* </div> */}
          <div className="freelancersList__popout">
            {/* <div>Howdy</div> */}
            <div className="freelancersList__popout__block">
              <div className="freelancersList__popout__heading">
                {freelancer.heading}
              </div>
              <img
                id="freelancersList__popout__lineSpace"
                className="freelancersList__popout__img"
                src={freelancer.profile_image}
              />
              <div
                id="freelancersList__popout__lineSpace"
                className="freelancersList__name"
              >
                {freelancer.first_name} {freelancer.last_name}
              </div>
              <div id="freelancersList__popout__lineSpace">
                {freelancer.specialty}
              </div>

              <div id="freelancersList__popout__lineSpace">
                {freelancer.city}, {freelancer.state}
              </div>
              <div id="freelancersList__popout__lineSpace">
                {freelancer.skills}
              </div>
            </div>
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
