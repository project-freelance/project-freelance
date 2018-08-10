import React, { Component } from "react";
import { connect } from "react-redux";
import { getFreelancer } from "../../../ducks/freelancerReducer";
import AddReview from "./Reviews/AddReview/AddReview";
import { getUser } from "../../../ducks/userReducer";
import { getAvgRating } from "../../../ducks/reviewReducer";
import EmployerProfile from "./EmployerProfile";
import Portfolio from "./Portfolio/Portfolio";
import AvgRating from "./Reviews/AvgRating/AvgRating";
class Profile extends Component {
  componentDidMount() {
    this.props.getFreelancer(this.props.match.params.id);
    // this.props.getUser();
    this.props.getAvgRating(this.props.match.params.id);
  }

  render() {
    let { freelancer } = this.props;
    console.log(this.props);
    return (
      <div>
        {this.props.freelancer[0] &&
        this.props.freelancer[0].role === "Freelancer" ? (
          <div className="profile__container">
            <div>
              <h1>Freelancer Profile</h1>
              <img
                src={`${freelancer[0] && freelancer[0].profile_image}`}
                alt="profile_pic"
                height="120"
                width="120"
              />
              <div>
                {`${freelancer[0] && freelancer[0].first_name}`}{" "}
                {`${freelancer[0] && freelancer[0].last_name}`}
              </div>

              <div>{`${freelancer[0] && freelancer[0].city}`}</div>

              {this.props.rating ? (
                <div>
                  <AvgRating rating={this.props.rating && +this.props.rating} />
                </div>
              ) : (
                <p>No rating dude</p>
              )}

              <div>{`${freelancer[0] && freelancer[0].specialty}`}</div>
              <div>Skills: {`${freelancer[0] && freelancer[0].skills}`}</div>
              <div>
                {`${freelancer[0] && freelancer[0].experience}`} years of
                experience
              </div>
              <div>Bio: {`${freelancer[0] && freelancer[0].bio}`}</div>
              <div>
                Portfolio:
                <img
                  src={`${freelancer[0] && freelancer[0].image_url}`}
                  height="80"
                  width="80"
                />
              </div>
              {/* <button>Contact Me (...email address in users table)</button> */}
              <button>
                <a
                  href={`mailto:${freelancer[0] &&
                    freelancer[0]
                      .email}?subject=I'd like to offer you a position with... `}
                >
                  <div>Contact Me</div>
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
          // null
          <EmployerProfile />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  freelancerReducer,
  userReducer,
  reviewReducer
}) => ({
  ...freelancerReducer,
  ...userReducer,
  ...reviewReducer
});

export default connect(
  mapStateToProps,
  { getFreelancer, getUser, getAvgRating }
)(Profile);
