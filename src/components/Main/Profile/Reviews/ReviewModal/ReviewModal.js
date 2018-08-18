import React, { Component } from "react";
// import Portfolio from "../Portfolio";
import AddReview from "../AddReview/AddReview";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import "./ReviewModal.css";
// import "./PortfolioModal.css";

export default class ReviewModal extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <div>
          <div
            className="reviewModal__addReview__btn"
            onClick={this.handleClickOpen}
          >
            Have you worked with {this.props[0] && this.props[0].company}? Write
            a review!
          </div>
        </div>
        {/* <div className="profile__portfolio__container">
          <img
            className="profile__portfolio__image"
            src={this.props.url1}
            onClick={this.handleClickOpen}
          />
        </div> */}
        <Dialog
          className="reviewModal__container"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          contentStyle={{
            width: "50vh",
            maxWidth: "100%",
            height: "50vw",
            padding: "30px"
          }}
        >
          <DialogContent>
            <div className="review__modal">
              <AddReview
                beingReviewed={this.props[0]}
                loggedInUser={this.props.loggedInUser[0]}
                handleClose={this.handleClose}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
