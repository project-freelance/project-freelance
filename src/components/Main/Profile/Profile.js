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
import Email from "@material-ui/icons/Email.js";
import "./Profile.css";
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      reviewShow: true,
      allReviewsShow: false,
      open: false,
      // freelancer: {
      heading: "",
      profile_image:
        "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif",
      first_name: "",
      last_name: "",
      city: "",
      state: "",
      specialty: "",
      skills: "",
      experience: "",
      bio: ""
      // }
    };
  }
  componentDidMount() {
    this.props.getFreelancer(this.props.match.params.id).then(() => {
      if (
        this.props.freelancer[0] &&
        this.props.freelancer[0].role === "Freelancer"
      ) {
        this.setState({
          heading: this.props.freelancer[0].heading,
          profile_image: this.props.freelancer[0].profile_image,
          first_name: this.props.freelancer[0].first_name,
          last_name: this.props.freelancer[0].last_name,
          city: this.props.freelancer[0].city,
          state: this.props.freelancer[0].state,
          specialty: this.props.freelancer[0].specialty,
          skills: this.props.freelancer[0].skills,
          experience: this.props.freelancer[0].experience,
          bio: this.props.freelancer[0].bio
        });
      }
    });
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

  render() {
    let reviewerId = this.props.reviews[0] && this.props.reviews[0].reviewer_id;
    let reviewerObj =
      this.props.users && this.props.users.find(user => user.id === reviewerId);

    let { freelancer, review } = this.props;

    let {
      first_name,
      profile_image,
      heading,
      last_name,
      city,
      state,
      specialty,
      skills,
      experience,
      bio
    } = this.state;
    return (
      <div className="profile__mainContainer">
        {this.props.freelancer[0] &&
        this.props.freelancer[0].role === "Freelancer" ? (
          <div>
            <div className="profile__header">{heading}</div>
            <div className="profile__container">
              <div className="profile__left__panel">
                <img className="profile__user__img" src={profile_image} />
              </div>
              <div>
                <div className="profile__right__panel">
                  <div className="profile__user__name">
                    {`${first_name}`} {`${last_name}`}
                  </div>
                  <div id="profile__line__space">
                    {freelancer[0].city && freelancer[0].city.length > 0 ? (
                      <div>
                        {`${city},`} {state}
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
                    {this.props.reviews.length > 0 ? (
                      <div className="profile__reviews__num">
                        ({this.props.reviews.length})
                      </div>
                    ) : null}
                  </div>
                  <div id="profile__line__space">{`${specialty}`}</div>
                  <div id="profile__line__space">
                    {freelancer[0].skills && freelancer[0].skills.length > 0 ? (
                      <div>
                        <div className="profile__skills__title">Skills:</div>
                        {`${skills}`}
                      </div>
                    ) : (
                      <div>No skills listed</div>
                    )}
                  </div>
                  <div id="profile__line__space">
                    {freelancer[0].experience &&
                    freelancer[0].experience > 0 ? (
                      <div className="profile__experienceBlock">
                        <div className="profile__experience__title">
                          Years of experience:{" "}
                        </div>
                        {`${experience}`}
                      </div>
                    ) : (
                      <div>No experience listed</div>
                    )}
                  </div>
                  {freelancer[0].bio && freelancer[0].bio.length > 0 ? (
                    <div id="profile__line__space">
                      <div className="profile__experience__title">
                        About me:
                      </div>
                      <div>{`${bio}`}</div>
                    </div>
                  ) : (
                    <div>No bio listed</div>
                  )}
                  <div className="profile__portfolio__title">Portfolio:</div>
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
                    <Button
                      href={`mailto:${freelancer[0] &&
                        freelancer[0]
                          .email}?subject=I'd like to offer you a position with... `}
                    >
                      Contact Me
                      <Email />
                      {/* <div className="profile__contact__text">Contact Me</div> */}
                    </Button>
                  </div>
                  <div className="profile__reviewsContainer">
                    <div
                      id="profile__line__space"
                      className="profile__reviews__title"
                    >
                      Reviews
                    </div>
                    <div />

                    {this.props.reviews.length < 1 ? (
                      <div>No reviews have been made</div>
                    ) : (
                      <div>
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
                    )}
                  </div>
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
