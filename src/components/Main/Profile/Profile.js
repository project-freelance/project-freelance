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
import Button from "@material-ui/core/Button";
import PortfolioModal from "./Portfolio/PortfolioModal/PortfolioModal";
import ReviewModal from "./Reviews/ReviewModal/ReviewModal";
import "./Profile.css";
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      reviewShow: true,
      allReviewsShow: false,
      open: false
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

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

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
          <div>
            <div className="profile__header">
              {freelancer[0] && freelancer[0].heading}
            </div>
            <div className="profile__container">
              <div className="profile__left__panel">
                <img
                  className="profile__user__img"
                  src={freelancer[0] && freelancer[0].profile_image}
                />
              </div>
              <div>
                <div className="profile__right__panel">
                  <div className="profile__user__name">
                    {`${freelancer[0] && freelancer[0].first_name}`}{" "}
                    {`${freelancer[0] && freelancer[0].last_name}`}
                  </div>
                  <div id="profile__line__space">
                    {freelancer[0].city && freelancer[0].city.length > 0 ? (
                      <div>
                        {`${freelancer[0] && freelancer[0].city},`}{" "}
                        {freelancer[0] && freelancer[0].state}
                      </div>
                    ) : (
                      <div>No city listed</div>
                    )}
                  </div>
                  <div className="profile__stars__number">
                    {this.props.rating && this.props.rating > 0 ? (
                      <div>
                        <AvgRating
                          rating={this.props.rating && +this.props.rating}
                        />
                      </div>
                    ) : (
                      <div>
                        <div>No ratings have been made yet.</div>
                      </div>
                    )}
                    <div className="profile__reviews__num">
                      ({this.props.reviews.length})
                    </div>
                  </div>
                  <div id="profile__line__space">{`${freelancer[0] &&
                    freelancer[0].specialty}`}</div>
                  <div id="profile__line__space">
                    {freelancer[0].skills && freelancer[0].skills.length > 0 ? (
                      <div>
                        Skills: {`${freelancer[0] && freelancer[0].skills}`}
                      </div>
                    ) : (
                      <div>No skills listed</div>
                    )}
                  </div>
                  <div id="profile__line__space">
                    {freelancer[0].experience &&
                    freelancer[0].experience > 0 ? (
                      <div>
                        {`${freelancer[0] && freelancer[0].experience}`} years
                        of experience
                      </div>
                    ) : (
                      <div>No experience listed</div>
                    )}
                  </div>
                  {freelancer[0].bio && freelancer[0].bio.length > 0 ? (
                    <div id="profile__line__space">
                      <div>About me:</div>
                      <div>{`${freelancer[0] && freelancer[0].bio}`}</div>
                    </div>
                  ) : (
                    <div>No bio listed</div>
                  )}
                  <div className="profile__portfolio__title">Portfolio</div>
                  <div
                    id="profile__line__space"
                    className="profile__sample__portfolio"
                  >
                    <PortfolioModal
                      url1={this.props.freelancer[0].image_url1}
                      link1={this.props.freelancer[0].link1}
                      url2={this.props.freelancer[0].image_url2}
                      link2={this.props.freelancer[0].link2}
                      url3={this.props.freelancer[0].image_url3}
                      link3={this.props.freelancer[0].link3}
                    />
                  </div>
                  <div
                    className="profile__contact__btn"
                    id="profile__line__space"
                  >
                    <a
                      href={`mailto:${freelancer[0] &&
                        freelancer[0]
                          .email}?subject=I'd like to offer you a position with... `}
                    >
                      <div className="profile__contact__text">Contact Me</div>
                    </a>
                  </div>
                  <div>
                    <div
                      id="profile__line__space"
                      className="profile__reviews__title"
                    >
                      Reviews
                    </div>
                    <div />
                    {this.state.reviewShow ? (
                      <div>
                        <div className="profile__review__block">
                          <div
                            style={{
                              backgroundImage: `url(${reviewerObj &&
                                reviewerObj.profile_image})`
                            }}
                            className="profile__reviewer__img"
                          />
                          <div className="profile__review__textBlock">
                            <div>
                              {reviewerObj && reviewerObj.first_name}{" "}
                              {reviewerObj && reviewerObj.last_name}
                            </div>
                            {this.props.reviews[0] &&
                              this.props.reviews[0].review}
                            <div className="profile__review__moment">
                              <Moment fromNow>
                                {this.props.reviews[0] &&
                                  this.props.reviews[0].moment}
                              </Moment>
                            </div>
                          </div>
                        </div>
                        <div
                          className="profile__reviews__toggle"
                          onClick={() => this.toggleReviews()}
                        >
                          See All Reviews
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Reviews
                          reviews={this.props.reviews && this.props.reviews}
                          users={this.props.users && this.props.users}
                        />
                        <div
                          className="profile__reviews__toggle"
                          onClick={() => {
                            this.toggleReviews();
                          }}
                        >
                          Minimize Reviews
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="profile__addReview__btn">
                    Have you worked with {freelancer[0].first_name}? Write a
                    review
                  </div>
                  {/* <AddReview {...freelancer} loggedInUser={this.props.user} /> */}
                  <ReviewModal {...freelancer} loggedInUser={this.props.user} />
                </div>
              </div>
            </div>
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
