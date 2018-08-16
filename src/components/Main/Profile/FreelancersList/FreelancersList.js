import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllFreelancerInfo } from "../../../../ducks/freelancerReducer";
import "./FreelancersList.css";
import { Link } from "react-router-dom";

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
      console.log(freelancer);
      return (
        <Link to={`/main/profile/${freelancer.user_id}`}>
          <div key={freelancer.id} className="freelancersList__wrapper">
            {/* <div className="freelancersList__block">
            <img
              className="freelancersList__img"
              src={freelancer.profile_image}
            />
            <div className="freelancersList__name">
              {freelancer.first_name} {freelancer.last_name}
            </div> */}

            <div className="freelancersList__popout">
              <div className="freelancersList__popout__block">
                <div className="freelancersList__popout__heading">
                  {freelancer.heading}
                </div>
                <div className="freelancersList__popout__belowHeading">
                  <img
                    id="freelancersList__popout__lineSpace"
                    className="freelancersList__popout__img"
                    src={freelancer.profile_image}
                  />
                  <div className="freelancersList__popout__textBlock">
                    <div
                      id="freelancersList__popout__lineSpace"
                      className="freelancersList__name"
                    >
                      <div id="freelancer__popout__textBlock__nameRole">
                        <div className="freelancersList__popout__textBlock__nameState">
                          {freelancer.first_name} {freelancer.last_name}
                        </div>
                      </div>
                      <div id="freelancer__popout__textBlock__citySkills">
                        {freelancer.city}, {freelancer.state}
                      </div>
                    </div>
                    <div className="freelancersList__popout__textBlock__specialtySkills">
                      <div id="freelancer__popout__textBlock__nameRole">
                        <div>{freelancer.specialty}</div>
                      </div>
                      <div id="freelancer__popout__textBlock__citySkills">
                        {freelancer.skills}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
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
