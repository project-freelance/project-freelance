import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmployer } from "../../../ducks/employerReducer";
import AddReview from "./Reviews/AddReview/AddReview";
import { getUser } from "../../../ducks/userReducer";
import { getAvgRating } from "../../../ducks/reviewReducer";
import { withRouter } from "react-router-dom";
import AvgRating from "./Reviews/AvgRating/AvgRating";
class EmployerProfile extends Component {
  componentDidMount() {
    this.props.getEmployer(this.props.match.params.id);
    // this.props.getUser();
    this.props.getAvgRating(this.props.match.params.id);
  }

  render() {
    let { employer } = this.props;
    console.log(this.props);
    return (
      <div>
        <div>
          <div>
            <h1>Employer Profile</h1>
          </div>
          <img
            src={`${employer[0] && employer[0].company_logo}`}
            alt="company logo"
            height="120"
            width="120"
          />
          <div>{`${employer[0] && employer[0].company}`}</div>
          {/* <div>Hiring Mgr: </div> */}
          <div>
            Hiring Mgr: {`${employer[0] && employer[0].first_name}`}{" "}
            {`${employer[0] && employer[0].last_name}`}
          </div>
          <div>Position: {`${employer[0] && employer[0].position}`} </div>
          <img
            src={`${employer[0] && employer[0].profile_image}`}
            alt="profile_pic"
            height="60"
            width="60"
          />
          <div>City: {`${employer[0] && employer[0].city}`}</div>
          <div>
            <AvgRating rating={this.props.rating && +this.props.rating} />
          </div>
          <div>Bio: {`${employer[0] && employer[0].bio}`}</div>
          <button>
            <a
              href={`mailto:${employer[0] &&
                employer[0]
                  .email}?subject=I'd like to offer you a position with... `}
            >
              <div>Contact Me</div>
            </a>
          </button>
        </div>
        <AddReview {...employer} loggedInUser={this.props.user} />
      </div>
    );
  }
}

const mapStateToProps = ({ employerReducer, userReducer, reviewReducer }) => ({
  ...employerReducer,
  ...userReducer,
  ...reviewReducer
});

export default withRouter(
  connect(
    mapStateToProps,
    { getEmployer, getUser, getAvgRating }
  )(EmployerProfile)
);
