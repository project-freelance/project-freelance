import React, { Component } from "react";
import Moment from "react-moment";

class Reviews extends Component {
  render(props) {
    console.log(this.props);
    let myReviews = this.props.reviews.map(review => {
      let reviewerObj =
        this.props.users &&
        this.props.users.find(user => user.id === review.reviewer_id);
      console.log(reviewerObj);
      return (
        <div key={review.id}>
          <div>
            {reviewerObj && reviewerObj.first_name}{" "}
            {reviewerObj && reviewerObj.last_name}
          </div>
          <img
            src={reviewerObj && reviewerObj.profile_image}
            height="60"
            width="60"
          />
          <div>{review.review}</div>
          <Moment fromNow>{review.moment}</Moment>
        </div>
      );
    });
    return (
      <div>
        <div>Reviewsssssss</div>
        <div>{myReviews}</div>
      </div>
    );
  }
}

export default Reviews;
