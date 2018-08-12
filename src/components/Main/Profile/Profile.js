import React, { Component } from "react";
import { connect } from "react-redux";
import { getFreelancer } from "../../../ducks/freelancerReducer";
import AddReview from "./Reviews/AddReview/AddReview";
import { getUser, getUsers } from "../../../ducks/userReducer";
import { getAvgRating, getReviews } from "../../../ducks/reviewReducer";
import EmployerProfile from "./EmployerProfile";
import Portfolio from "./Portfolio/Portfolio";
import AvgRating from "./Reviews/AvgRating/AvgRating";
import Moment from "react-moment";
import Reviews from "./Reviews/Reviews";
import "./Profile.css";
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      reviewShow: true,
      allReviewsShow: false
    };
  }
  componentDidMount() {
    this.props.getFreelancer(this.props.match.params.id);
    // this.props.getUser();
    this.props.getAvgRating(this.props.match.params.id);
    this.props.getReviews(this.props.match.params.id);
  }

  toggleReviews = () => {
    this.setState({ reviewShow: !this.state.reviewShow });
  };

  render() {
    let reviewerId = this.props.reviews[0] && this.props.reviews[0].reviewer_id;
    let reviewerObj =
      this.props.users && this.props.users.find(user => user.id === reviewerId);
    console.log(reviewerObj);

    let { freelancer, review } = this.props;
    console.log(this.props);
    return (
      <div>
        {this.props.freelancer[0] &&
        this.props.freelancer[0].role === "Freelancer" ? (
          <div className="profile__container">
            <div className="profile_left_panel">
              {/* <h1>Freelancer Profile</h1> */}
              <div
                style={{
                  backgroundImage: `url(${freelancer[0] &&
                    freelancer[0].profile_image}`
                }}
                className="profile_user_img"
              />
              {/* <img
                src={`${freelancer[0] && freelancer[0].profile_image}`}
                alt="profile_pic"
                // height="120"
                // width="120"
                className="profile_user_img"
              /> */}
            </div>
            <div>
              <div className="profile_right_panel">
                <div>
                  {`${freelancer[0] && freelancer[0].first_name}`}{" "}
                  {`${freelancer[0] && freelancer[0].last_name}`}
                </div>

                {freelancer[0].city && freelancer[0].city.length > 0 ? (
                  <div>{`${freelancer[0] && freelancer[0].city}`}</div>
                ) : (
                  <div>No city listed</div>
                )}

                {this.props.rating && this.props.rating > 0 ? (
                  <div>
                    <AvgRating
                      rating={this.props.rating && +this.props.rating}
                    />
                  </div>
                ) : (
                  <div>
                    <div>No Rating Dude</div>
                  </div>
                )}

                <div>{`${freelancer[0] && freelancer[0].specialty}`}</div>

                {freelancer[0].skills && freelancer[0].skills.length > 0 ? (
                  <div>
                    Skills: {`${freelancer[0] && freelancer[0].skills}`}
                  </div>
                ) : (
                  <div>No skills listed</div>
                )}

                {freelancer[0].experience && freelancer[0].experience > 0 ? (
                  <div>
                    {`${freelancer[0] && freelancer[0].experience}`} years of
                    experience
                  </div>
                ) : (
                  <div>No experience listed</div>
                )}

                {freelancer[0].bio && freelancer[0].bio.length > 0 ? (
                  <div>Bio: {`${freelancer[0] && freelancer[0].bio}`}</div>
                ) : (
                  <div>No bio listed</div>
                )}

                <div>
                  Reviews:
                  {this.state.reviewShow ? (
                    <div>
                      <div>
                        {reviewerObj && reviewerObj.first_name}{" "}
                        {reviewerObj && reviewerObj.last_name}
                      </div>
                      <img
                        src={reviewerObj && reviewerObj.profile_image}
                        height="60"
                        width="60"
                      />
                      {this.props.reviews[0] && this.props.reviews[0].review}
                      <Moment fromNow>
                        {this.props.reviews[0] && this.props.reviews[0].moment}
                      </Moment>

                      <button onClick={() => this.toggleReviews()}>
                        See All Reviews
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Reviews
                        reviews={this.props.reviews && this.props.reviews}
                        users={this.props.users && this.props.users}
                      />
                      <button
                        onClick={() => {
                          this.toggleReviews();
                        }}
                      >
                        Minimize Reviews
                      </button>
                    </div>
                  )}
                </div>

                {/* <div>
                Portfolio:
                <img
                  src={`${freelancer[0] && freelancer[0].image_url}`}
                  height="80"
                  width="80"
                />
              </div> */}
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
            </div>
            {/* <AddReview
              {...freelancer}
              loggedInUser={this.props.user}
            /> */}
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
  { getFreelancer, getUser, getUsers, getAvgRating, getReviews }
)(Profile);
