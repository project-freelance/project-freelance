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

  render() {
    // console.log(this.props);
    console.log(this.state);
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
        <button>Submit Review</button>
      </div>
    );
  }
}

export default AddReview;
