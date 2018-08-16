import React, { Component } from "react";
import Moment from "react-moment";
import "./Reviews.css";

class Reviews extends Component {
  render(props) {
    let myReviews = this.props.reviews.map(review => {
      let reviewerObj =
        this.props.users &&
        this.props.users.find(user => user.id === review.reviewer_id);
      console.log(reviewerObj);
      return (
        <div className="reviews__review__block" key={review.id}>
          <img
            src={reviewerObj && reviewerObj.profile_image}
            className="reviews__reviewer__img"
            alt="profile"
          />
          <div className="reviews__review__textBlock">
            <div>
              {reviewerObj && reviewerObj.first_name}{" "}
              {reviewerObj && reviewerObj.last_name}
            </div>
            <div>{review.review}</div>
            <div className="reviews__review__moment">
              <Moment fromNow>{review.moment}</Moment>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="reviews__container">
        <div>{myReviews}</div>
      </div>
    );
  }
}

export default Reviews;
