import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import { connect } from "react-redux";
import { addReview } from "../../../../../ducks/reviewReducer";

class AddReview extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      time: new Date(),
      rating: 0
    };
  }

  changeHandler = e => {
    this.setState({
      userInput: e.target.value
    });
  };

  changeRating = (newRating, name) => {
    this.setState({
      rating: newRating
    });
  };

  submitHandler = (review, user_id, reviewer_id, moment, rating) => {
    // console.log(review, user_id, review_id, moment, rating);
    this.props.addReview(review, user_id, reviewer_id, moment, rating);
  };

  render() {
    // console.log(this.props);
    // console.log(this.props[0] && this.props[0].email);
    // console.log(this.state);
    // console.log(typeof this.props.loggedInUser[0].id);
    return (
      <div>
        <div>Leave Review of {this.props.name}</div>
        <input
          onChange={e => this.changeHandler(e)}
          placeholder="Enter review here"
        />
        <StarRatings
          rating={this.state.rating}
          starRatedColor="red"
          starHoverColor="gold"
          changeRating={this.changeRating}
          numberOfStars={5}
          name="rating"
          starDimension="25px"
        />
        <button
          onClick={() =>
            this.submitHandler(
              this.state.userInput,
              this.props[0] && this.props[0].user_id,
              this.props.loggedInUser[0] && this.props.loggedInUser[0].id,
              this.state.time,
              this.state.rating
            )
          }
        >
          Submit Review
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ reviewReducer }) => ({ ...reviewReducer });

export default connect(
  mapStateToProps,
  { addReview }
)(AddReview);
