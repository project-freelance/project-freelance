import React, { Component } from "react";
import StarRatings from "react-star-ratings";

class AvgRating extends Component {
  constructor() {
    super();
    this.state = {
      rating: 0
    };
  }

  changeRating = (newRating, name) => {
    this.setState({
      rating: newRating
    });
  };

  render() {
    return (
      <div>
        <StarRatings
          rating={this.props.rating}
          starRatedColor="gold"
          //   changeRating={this.changeRating}
          numberOfStars={5}
          name="rating"
          starDimension="30px"
        />
      </div>
    );
  }
}

export default AvgRating;
