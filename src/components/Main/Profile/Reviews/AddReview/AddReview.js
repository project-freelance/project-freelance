import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import { connect } from 'react-redux';
import { addReview, getReviews } from '../../../../../ducks/reviewReducer';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class AddReview extends Component {
  constructor() {
    super();
    this.state = {
      userInput: '',
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

  handleClose = () => {
    this.setState({ open: false });
  };

  submitHandler = (review, user_id, reviewer_id, moment, rating) => {
    // console.log(review, user_id, review_id, moment, rating);
    this.props
      .addReview(review, user_id, reviewer_id, moment, rating)
      .then(() => {
        this.props.getReviews(this.props.match.params.id);
      });
  };

  // goToProperty = id => {
  //   this.props.history.push(`/property/${id}`);
  // };

  render() {
    console.log(this.props);
    // console.log(this.props[0] && this.props[0].first_name);
    return (
      <div>
        <div>
          Leave Review of{' '}
          {this.props.beingReviewed && this.props.beingReviewed.first_name}
        </div>
        {/* <input
          onChange={e => this.changeHandler(e)}
          placeholder="Enter review here"
        /> */}
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
        {/* <button
          onClick={() =>
            this.submitHandler(
              this.state.userInput,
              this.props[0] && this.props[0].user_id,
              this.props.loggedInUser[0] && this.props.loggedInUser[0].id,
              this.state.time,
              this.state.rating
            )
          }
        > */}
        <br />
        <Button
          variant="contained"
          onClick={() => {
            this.handleClose,
              this.submitHandler(
                this.state.userInput,
                this.props.beingReviewed && this.props.beingReviewed.user_id,
                this.props.loggedInUser && this.props.loggedInUser.id,
                this.state.time,
                this.state.rating
              );
          }}
          type="submit"
          // onClick={() => this.props.onClose}
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
    { addReview, getReviews }
  )(AddReview)
);
