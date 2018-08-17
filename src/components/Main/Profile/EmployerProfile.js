import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmployer } from "../../../ducks/employerReducer";
import AddReview from "./Reviews/AddReview/AddReview";
import { getUser, getUsers } from "../../../ducks/userReducer";
import { getAvgRating, getReviews } from "../../../ducks/reviewReducer";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import AvgRating from "./Reviews/AvgRating/AvgRating";
import Reviews from "./Reviews/Reviews";
import ReviewModal from "./Reviews/ReviewModal/ReviewModal";
import Email from "@material-ui/icons/Email.js";
import Button from "@material-ui/core/Button";
import "./EmployerProfile.css";
class EmployerProfile extends Component {
  constructor() {
    super();
    this.state = {
      reviewShow: true,
      allReviewsShow: false
    };
  }
  componentDidMount() {
    this.props.getEmployer(this.props.match.params.id);
    // this.props.getUser();
    this.props.getAvgRating(this.props.match.params.id);
  }

  toggleReviews = () => {
    this.setState({ reviewShow: !this.state.reviewShow });
  };

  render() {
    console.log(this.props);
    let reviewerId = this.props.reviews[0] && this.props.reviews[0].reviewer_id;

    let reviewerObj =
      this.props.users && this.props.users.find(user => user.id === reviewerId);
    let { employer, review } = this.props;
    return (
      <div>
        <div className="employerProfile__header">
          {employer[0] && employer[0].heading}
        </div>
        <div className="employerProfile__container">
          <div className="employerProfile__left__panel">
            <img
              src={`${employer[0] && employer[0].company_logo}`}
              alt="company logo"
              className="employerProfile__company__img"
              // height="120"
              // width="120"
            />
          </div>
          <div className="employerProfile__right__panel">
            <div className="employerProfile__company">{`${employer[0] &&
              employer[0].company}`}</div>
            <div id="employerProfile__line__space">
              {`${employer[0] && employer[0].city}`},{" "}
              {`${employer[0] && employer[0].state}`}
            </div>
            {this.props.rating && this.props.rating > 0 ? (
              <div
                className="employerProfile__avgReview__block"
                id="employerProfile__line__space"
              >
                <AvgRating rating={this.props.rating && +this.props.rating} />
                <div className="employerProfile__reviews__num">
                  ({this.props.reviews.length})
                </div>
              </div>
            ) : (
              <div>
                <div>No ratings have been made yet.</div>
              </div>
            )}

            <div id="employerProfile__line__space">
              <div className="employerProfile__titleText">Company Profile:</div>
              <div>{`${employer[0] && employer[0].bio}`}</div>
            </div>

            <div
              id="employerProfile__line__space"
              className="employerProfile__mgr__block"
            >
              <div className="employerProfile__mgr__text">
                <div className="employerProfile__titleText">
                  Point of Contact:
                </div>
                <div>
                  {`${employer[0] && employer[0].first_name}`}{" "}
                  {`${employer[0] && employer[0].last_name}`},{" "}
                  {`${employer[0] && employer[0].position}`}
                </div>
              </div>
              <div>
                <img
                  src={`${employer[0] && employer[0].profile_image}`}
                  alt="profile_pic"
                  height="60"
                  width="60"
                  className="employerProfile__mgr__img"
                />
              </div>
            </div>

            <div
              className="employerProfile__contact__btn"
              id="profile__line__space"
            >
              <Button
                href={`mailto:${employer[0] &&
                  employer[0]
                    .email}?subject=I'd like to offer you a position with... `}
              >
                Contact Me<Email />
              </Button>
            </div>
            {/* <AddReview {...employer} loggedInUser={this.props.user} /> */}
            <div>
              <div
                id="employerProfile__line__space"
                className="employerProfile__titleText"
              >
                Reviews
              </div>
              <div />

              {this.props.reviews.length < 1 ? (
                <div>No Reviews Dude</div>
              ) : (
                <div>
                  {this.state.reviewShow ? (
                    <div>
                      <div className="employerProfile__review__block">
                        <div
                          style={{
                            backgroundImage: `url(${reviewerObj &&
                              reviewerObj.profile_image})`
                          }}
                          className="employerProfile__reviewer__img"
                        />
                        <div className="employerProfile__review__textBlock">
                          <div>
                            {reviewerObj && reviewerObj.first_name}{" "}
                            {reviewerObj && reviewerObj.last_name}
                          </div>
                          {this.props.reviews[0] &&
                            this.props.reviews[0].review}
                          <div className="employerProfile__review__moment">
                            <Moment fromNow>
                              {this.props.reviews[0] &&
                                this.props.reviews[0].moment}
                            </Moment>
                          </div>
                        </div>
                      </div>
                      <div
                        className="employerProfile__reviews__toggle"
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

              <ReviewModal {...employer} loggedInUser={this.props.user} />
            </div>
          </div>
        </div>
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
    { getEmployer, getUser, getUsers, getAvgRating, getReviews }
  )(EmployerProfile)
);
