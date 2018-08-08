import React, { Component } from "react";
import StarRatings from "react-star-ratings";

class AddReview extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      time: new Date(),
      rating: 0
    };
  }
  render() {
    return (
      <div>
        <div>Leave Review of ...Name/Company(props)</div>
        <input
          onChange={e => this.changeHandler(e)}
          placeholder="Enter review here"
        />
        <StarRatings
          rating={this.state.rating}
          starRatedColor="gold"
          starHoverColor="gold"
          changeRating={this.changeRating}
          numberOfStars={5}
          name="rating"
          starDimension="30px"
        />
      </div>
    );
  }
}

export default AddReview;
