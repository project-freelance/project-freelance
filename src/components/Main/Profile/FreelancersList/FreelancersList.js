import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllFreelancerInfo } from "../../../../ducks/freelancerReducer";
import "./FreelancersList.css";
import { Link } from "react-router-dom";

class FreelancersList extends Component {
  constructor() {
    super();
    this.state = {
      filterString: "",
      smallProfileShow: true,
      fullProfileShow: false
    };
  }

  componentDidMount() {
    this.props.getAllFreelancerInfo();
  }

  handleChange = e => {
    this.setState({
      filterString: e.target.value
    });
  };

  render() {
    let freelancers = this.props.allFreelancers
      .filter((freelancer, ind) => {
        return (
          freelancer.specialty.includes(this.state.filterString) ||
          freelancer.first_name.includes(this.state.filterString)
        );
      })
      .map(freelancer => {
        return (
          <Link to={`/main/profile/${freelancer.user_id}`}>
            <div className="freelancersList__popout__card">
              <img
                // id="freelancersList__popout__lineSpace"
                className="freelancersList__popout__img"
                src={freelancer.profile_image}
                width="340"
                height="280"
              />
              <div className="freelancersList__popout__textBlock">
                {/* <div id="freelancer__popout__textBlock__nameRole"> */}
                <div className="freelancer__popout__mainText">
                  {freelancer.first_name} {freelancer.last_name}
                </div>
                {/* </div> */}
                <div className="freelancersList__popout__textBlock__specialtySkills">
                  <div id="freelancer__popout__textBlock__nameRole">
                    <div className="freelancersList__popout__specialty">
                      {freelancer.specialty}
                    </div>
                  </div>
                  <div>Skills:</div>
                  <div id="freelancer__popout__textBlock__skills">
                    {freelancer.skills}
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
        <input
          onChange={e => {
            this.handleChange(e);
          }}
        />
        <div className="freelancersList__totalWrapper">{freelancers}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ freelancerReducer }) => ({ ...freelancerReducer });

export default connect(
  mapStateToProps,
  { getAllFreelancerInfo }
)(FreelancersList);
