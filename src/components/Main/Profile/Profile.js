import React, { Component } from "react";
import { connect } from "react-redux";
import { getFreelancer } from "../../../ducks/freelancerReducer";
import AddReview from "./Reviews/AddReview/AddReview";
import { getUser } from "../../../ducks/userReducer";
import EmployerProfile from "./EmployerProfile";
class Profile extends Component {
  componentDidMount() {
    this.props.getFreelancer(this.props.match.params.id);
    this.props.getUser();
  }

  render() {
    let { freelancer } = this.props;
    console.log(this.props);
    return (
      <div>
        {this.props.freelancer[0] &&
        this.props.freelancer[0].role === "Freelancer" ? (
          <div>
            <div>
              <h1>Freelancer Profile</h1>
              <div>
                {`${freelancer[0] && freelancer[0].first_name}`}{" "}
                {`${freelancer[0] && freelancer[0].last_name}`}
              </div>
              <img
                src={`${freelancer[0] && freelancer[0].profile_image}`}
                alt="profile_pic"
                height="120"
                width="120"
              />
              <div>{`${freelancer[0] && freelancer[0].city}`}</div>
              <div>Avg Rating (props...need to build)</div>
              <div>{`${freelancer[0] && freelancer[0].specialty}`}</div>
              <div>Skills: {`${freelancer[0] && freelancer[0].skills}`}</div>
              <div>
                {`${freelancer[0] && freelancer[0].experience}`} years of
                experience
              </div>
              <div>Bio: {`${freelancer[0] && freelancer[0].bio}`}</div>
              <div>
                Portfolio...need images{" "}
                {`${freelancer[0] && freelancer[0].image_url}`}
              </div>
              {/* <button>Contact Me (...email address in users table)</button> */}
              <button>
                <a
                  href={`mailto:${freelancer[0] &&
                    freelancer[0]
                      .email}?subject=I'd like to offer you a position with... `}
                >
                  <div>Contact</div>
                </a>
              </button>
              <button>Add Review/Rating</button>
            </div>
            <AddReview
              {...freelancer}
              // beingReviewed={`${freelancer[0] && freelancer[0].first_name}`}
              // beingReviewed={`${(...freelancer)}`}
              loggedInUser={this.props.user}
            />
          </div>
        ) : (
          <EmployerProfile />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ freelancerReducer, userReducer }) => ({
  ...freelancerReducer,
  ...userReducer
});

export default connect(
  mapStateToProps,
  { getFreelancer, getUser }
)(Profile);
