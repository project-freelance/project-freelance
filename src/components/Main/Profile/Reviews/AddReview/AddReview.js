import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import { connect } from "react-redux";
import {
  addReview,
  getReviews,
  getAvgRating
} from "../../../../../ducks/reviewReducer";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class AddReview extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      time: new Date(),
      rating: 0,
      open: false
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
    this.props
      .addReview(review, user_id, reviewer_id, moment, rating)
      .then(() => {
        this.props.getReviews(this.props.match.params.id);
      })
      .then(() => {
        this.props.getAvgRating(this.props.match.params.id);
      })
      .then(() => {
        this.props.handleClose();
      });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <div>
          Leave Review of{" "}
          {this.props.beingReviewed && this.props.beingReviewed.company}
        </div>
        <TextField
          multiline={true}
          rows={1}
          rowsMax={1}
          fullWidth
          margin="normal"
          placeholder="Type review here"
          helperText="Full width!"
          onChange={e => this.changeHandler(e)}
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
        <br />
        <Button
          variant="contained"
          onClick={() => {
            this.submitHandler(
              this.state.userInput,
              this.props.beingReviewed && this.props.beingReviewed.user_id,
              this.props.loggedInUser && this.props.loggedInUser.id,
              this.state.time,
              this.state.rating
            );
          }}
          type="submit"
        >
          Submit
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ reviewReducer }) => ({ ...reviewReducer });

export default withRouter(
  connect(
    mapStateToProps,
    { addReview, getReviews, getAvgRating }
  )(AddReview)
);
